# ImageCutter.js
A JavaScript image cutter for the browser.

Allows for cutting images in pieces using ```<canvas>```

Getting started
----

Simply include the library and import it.

``` JavaScript
import ImageCutter from './ImageCutter';

const imageCutter = new ImageCutter('http://example.com/image.png');

await imageCutter.init();

// Cut a 200x200 rectangle on position 0, 0.
const image = imageCutter.cut(200, 200, 0, 0);

// Do something with the image.
...
```

API
----

### constructor(src:String):ImageCutter ###

Creates a new instance of ImageCutter

- src:String - The URL of the image you want to cut.

Example:

``` JavaScript
const imageCutter = new ImageCutter('http://example.com/image.png');
```

Instance methods
---

### init():Promise ###

Setups the ImageCutter (downloads the image)

- returns:Promise - Resolves when it's done setting up.

Example:

``` JavaScript
imageCutter.init().then(() => {
    // Continue flow here.
});

// Or using async-await
await imageCutter.init();

```

### cut(width:Number, height:Number, x:Number = 0, y:Number = 0):String ###

Cuts the image in the given width, height and position. 

NOTICE: x and y should be negative if you want to move the position of the image.

- width:Number - The width of the cutted image
- height:Number - The height of the cutted image
- x:Number - The x-as position where you want to start cutting
- y:Number - The y-as position where you want to start cutting

returns:String - The cutted image as a base64 string.

Example:

``` JavaScript
// Cuts an image 200x200 and 200 pixels from the top.
const image = imageCutter.cut(200, 200, 0, -200);
```

### cutAll(width:Number, height:Number):Array<String> ###

Cuts the whole image in pieces with the given width and height.

- width:Number - The width of the cutted image
- height:Number - The height of the cutted image

returns:Array<String> - An array of cutted images.

Example:

``` JavaScript
const images = imageCutter.cutAll(200, 200);
```