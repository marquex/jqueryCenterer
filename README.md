jQuery Centerer
===============
Centerer is a small plugin for jQuery that allows to center an image, or any other HTML content, inside a container.

The use is very simple. Having the following HTML 

```html
<div id="container" style="width=300px; height=200px">
    <img src="path/to/image.jpg" width="600" height="300">
</div>
```

You can have your image centered in #container using this javascript
```javascript
$jQuery('#container').centerer();
```


Features
--------
* Image resizing to fit the container
* Resizing of the image and container detection, to have the image always centered.
* Small footprint: *< 1kb minified and gziped.*

Demos
-----
Visit the [jQuery Centerer project page demos](http://arqex.com/project/jquery-centerer) to see the plugin in action.

Options
-------
The plugin accepts options in the initialization with the following syntax
```javasctipt
jQuery(selector).centerer({option: value, option: value});
```
The following options are available:

**element** (Default: 'img'):

The selector of the element to be centered. Any jQuery selector can be used, so jQuery Centerer can be used to center any element, not only images.

**position** (Default: 'relative'):

The CSS position value to apply to the container. The image will be positioned absolutely inside the container, so will need the container to have a 'absolute' or 'relative' position. The possible values are
>* *relative*: Position relative for the container.
* *absolute*: Position absolute for the container.

**resizeType** (Default: 'noresize'):

The type of resizing to be applied to the image. Possible values are:
> * *noresize*: The image won't be resize at all, just centered.
* *overflow*: The image will be shrunk at least as possible to fit one dimension of the container, height or width, so the other dimension will overflow the container.
* *visible*: The image will be shrunk to fit the container being completely visible.

**resizeSupport** (Default: true):

If true, jQuery Centerer will listen to size changes in the image or the container to center it automatically. Since the dom elements don't trigger the 'resize' element, a timer is used to do so. 
