# languor
Distinguish intentional scroll and inertia scroll

Highly inspired by https://github.com/d4nyll/lethargy

My thanks to d4nyll. And sorry for copy some code.

This package is aiming at creating precise analysis of intentional scroll and inertia scroll.
Lethargy is a light weight npm package to help distinguishing between scroll events intiated by the user and those by inertia. It adopted a finited cache of scroll delta to determine the current state. In the information theory's term, it's a FIR filter which would cut the noise(inertia) and emphasize the signal(intentional). However, the FIR lethargy implemented is not a high pass filter, led to the result strong inertial scrolling will be recoginized as intentional. And that is what I want to solve in this package.