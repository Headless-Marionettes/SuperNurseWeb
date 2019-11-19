# SuperNurseWeb

###Setup
1. Clone repo
2. Run `npm install` in IDE terminal
3. Run `gulp` in IDE terminal

###Notes
1. Use /styleguide.html for style reference
    * typography and form elements are global
    * for buttons and cards use appropriate class
2. Useful sass functions
    * `color: get-color('primary')` (check colors in $color-context in scss/settings/contexts/_color.scss)
    * `rem-calc(24)` -- gets px value as a parameter, and returns rem with base 16 
3. Screen sizes: (matches bootstrap)
```
$screen-sizes: (
  'small': rem-calc(320),
  'medium': rem-calc(576),
  'large': rem-calc(768),
  'xlarge': rem-calc(992),
  'xxlarge': rem-calc(1200));
  ```
4. For media-query use
```
.someClass {
    //css rule for small screen
   
    @include media-query\apply('medium') {
      //css rule for medium screen
    }
 }
 ```
