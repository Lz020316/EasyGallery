/**
 * @description EasyGallery
 * @version 1.0.0
 * @license MIT
 * @author LiZhong 
 * 
*/

/**
 * Represents a photo.
 * @class
 */
class Photo {
    /**
     * Creates an instance of Photo.
     * @param {string} src - The URL of the photo.
     * @param {number} width - The original width of the photo.
     * @param {number} height - The original height of the photo.
     */
    constructor(src, width, height) {
        this.src = src;           // The source of the photo
        this.width = width;       // The original width
        this.height = height;     // The original height
        this.aspectRatio = width / height; // Calculate the aspect ratio
    }
}

/**
 * Represents a row of photos.
 * @class
 */
class Row {
    /**
     * Creates an instance of Row.
     * @param {number} targetHeight - The target height of the row.
     * @param {number} containerWidth - The width of the container.
     * @param {number} margin - The margin between photos.
     */
    constructor(targetHeight, containerWidth, margin) {
        this.photos = [];                 // The list of photos in the current row
        this.targetHeight = targetHeight; // The target height of the row
        this.containerWidth = containerWidth; // The width of the container
        this.margin = margin;             // The margin between photos
    }

    /**
     * Adds a photo to the current row.
     * @param {Photo} photo - The photo object to add.
     */
    addPhoto(photo) {
        this.photos.push(photo); // Add the photo to the list of photos in the row
    }

    /**
     * Calculates the total width of the current row (based on the target height).
     * @returns {number} The total width of the current row.
     */
    getCurrentWidth() {
        // Calculate the total width of all photos in the row at the target height
        let totalWidth = this.photos.reduce((sum, photo) => sum + (photo.aspectRatio * this.targetHeight), 0);
        totalWidth += (this.photos.length - 1) * this.margin; // Add the total margin between photos
        return totalWidth;
    }

    /**
     * Calculates the row height and the display size of each photo.
     */
    calculate() {
        // Calculate the total aspect ratio of all photos in the row
        let totalAspectRatio = this.photos.reduce((sum, photo) => sum + photo.aspectRatio, 0);
        // Calculate the actual row height based on the container width and total aspect ratio
        this.height = (this.containerWidth - (this.photos.length - 1) * this.margin) / totalAspectRatio;

        // Limit the row height to not exceed 110% of the target height to prevent photos from being too tall
        if (this.height > this.targetHeight * 1.1) {
            this.height = this.targetHeight;
        }

        // Calculate the display width and height of each photo
        this.photos.forEach(photo => {
            photo.displayWidth = this.height * photo.aspectRatio;  // Display width = row height × aspect ratio
            photo.displayHeight = this.height;                    // Display height = row height
        });
    }
}

/**
 * Represents the entire gallery.
 * @class
 */
class Gallery {
    /**
     * Creates an instance of Gallery.
     * @param {Photo[]} photos - The array of photo objects.
     * @param {string} containerId - The ID of the container element.
     * @param {Object} options - The configuration options.
     * @param {number} options.targetHeight - The target height of the rows.
     * @param {number} options.margin - The margin between photos.
     */
    constructor(photos, containerId, options) {
        this.photos = photos;                 // List of all photos
        this.container = document.getElementById(containerId); // Get the container DOM element
        this.targetHeight = options.targetHeight || 300;       // Set the target row height, default is 300
        this.margin = options.margin || 5;                     // Set the margin between photos, default is 5
        this.rows = [];                                        // Initialize the list of rows

        // Bind events during initialization
        this.bindEvents();
    }

    static Row(){
        return Row;
    }
    /**
     * Binds event listeners
     */
    bindEvents() {
        // Listen to window resize events, using debounce
        window.addEventListener('resize', this.debounce(() => {
            this.init(); // Re-layout and render
        }, 200));
    }

    /**
     * Debounce function to limit the frequency of function calls
     * @param {Function} func - The function to be debounced
     * @param {number} wait - The wait time in milliseconds
     * @returns {Function} The debounced function
     */
    debounce(func, wait) {
        let timeout;
        return () => {
            clearTimeout(timeout);
            timeout = setTimeout(func, wait);
        };
    }

    /**
     * Performs the layout algorithm to arrange photos into rows.
     */
    layout() {
        this.containerWidth = this.container.clientWidth; // Get the width of the container
        this.rows = [];

        let row = new Row(this.targetHeight, this.containerWidth, this.margin);

        // For each photo, add it to the current row
        this.photos.forEach(photo => {
            row.addPhoto(photo);
            let currentWidth = row.getCurrentWidth();
            // If the total width of the current row exceeds the container width, create a new row
            if (currentWidth > this.containerWidth) {
                row.calculate();
                this.rows.push(row);
                row = new Row(this.targetHeight, this.containerWidth, this.margin);
            }
        });

        // Add the last row to the list if it is not empty
        if (row.photos.length > 0) {
            row.calculate();
            this.rows.push(row);
        }
    }

    /**
     * Renders the gallery to the page.
     */
    render() {
        this.container.innerHTML = '';

        // 遍历每一行，创建对应的DOM元素
        this.rows.forEach(row => {
            let rowElement = document.createElement('div');
            rowElement.className = 'row';

            // 遍历行内的每一张照片，创建<img>元素
            row.photos.forEach((photo, index) => {
                let img = document.createElement('img');
                img.className = 'photo';
                img.src = photo.src;
                img.style.width = photo.displayWidth + 'px';
                img.style.height = photo.displayHeight + 'px';
                img.style.marginRight = (index < row.photos.length - 1) ? this.margin + 'px' : '0'; // Add margin to the right of the photo

                rowElement.appendChild(img);      
            });

            this.container.appendChild(rowElement);
        });
    }

    /**
     * Initializes the gallery, performs layout and rendering.
     */
    init() {
        this.layout(); // Perform layout algorithm
        this.render(); // Render to the page
    }
}

export default {
    Gallery,
    Photo,
    Row
}