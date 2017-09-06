#Highly inspired by https://github.com/d4nyll/lethargy
#My thanks to d4nyll. And sorry for copy some code.
#This package is aiming at creating precise analysis of intentional scroll and inertia scroll.
#Lethargy is a light weight npm package to help distinguishing between scroll events intiated
# by the user and those by inertia. It adopted a finited cache of scroll delta to determine the
# current state. In the information theory's term, it's a FIR filter which would cut the noise(inertia)
# and emphasize the signal(intentional). However, the FIR lethargy implemented is not a high pass
# filter, led to the result strong inertial scrolling will be recoginized as intentional.
# And that is what I want to solve in this package.
#by yangpoll

abs = Math.abs

mul = (a, b) ->
  a.reduce (pre, cur, i) ->
    pre + cur * b[i - 1]

regularizeFIR = (fir) -> 
  total = Math.sqrt((fir.map (v) -> v * v).reduce (a, b) -> a + b)
  return fir.map (v) -> v / total

class Languor
  constructor: (stability, hpFIR, threshold, base) ->

    # Stability is how many records to use to calculate the average, and is the filter's length.
    @_len = if stability? then Math.abs stability else 8

    # High pass FIR filter.
    @_hpFIR = regularizeFIR(if hpFIR? then hpFIR else [1.4, -0.7, 0.3])

    # Threshold for filter output.
    @_th = if threshold? then threshold else 1.5

    # Base mouse wheel delta.
    @_base = if base? then base else 120

    # Scroll delta cache
    @_deltaLen = @_hpFIR.length
    @_deltas = (0 for [1..@_deltaLen])

    # Filter cache
    @_filtered = (0 for [1..(@_len)])
    @_ts = (null for [1..(@_len)])

  check: (e) ->

    # Standardise wheelDelta values for different browsers
    if e.wheelDelta?
      lastDelta = e.wheelDelta
    else if e.deltaY?
      lastDelta = e.deltaY * -40
    else if (e.detail? or e.detail == 0)
      lastDelta = e.detail * -40

    @_deltas.unshift(lastDelta)
    @_deltas.pop()

    # todo: check ts
    @_filtered.unshift(mul(@_deltas, @_hpFIR))
    @_filtered.pop()

    @_ts.unshift(Date.now())
    @_ts.pop()

    return @isInertia()

  isInertia: ->
    deltas = @_deltas
    filtered = @_filtered
    threshold = @_th
    base = @_base

    # detect mousewheel
    if deltas[0] == deltas[1] and abs(deltas[0]) >= base
      return false

    average = (filtered.reduce (a, b) -> a + b) / filtered.length
    # detect touch pan
    if abs(filtered[0] / average) >= threshold
      return false

    return true
      
export default Languor