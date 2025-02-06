/**
 * Represents a photo.
 */
declare class Photo {
    src: string;
    width: number;
    height: number;
    aspectRatio: number;
    displayWidth?: number;
    displayHeight?: number;

    /**
     * Creates an instance of Photo.
     * @param src - The URL of the photo.
     * @param width - The original width of the photo.
     * @param height - The original height of the photo.
     */
    constructor(src: string, width: number, height: number);
}

/**
 * Represents a row of photos.
 */
declare class Row {
    photos: Photo[];
    targetHeight: number;
    containerWidth: number;
    margin: number;
    height?: number;

    /**
     * Creates an instance of Row.
     * @param targetHeight - The target height of the row.
     * @param containerWidth - The width of the container.
     * @param margin - The margin between photos.
     */
    constructor(targetHeight: number, containerWidth: number, margin: number);

    /**
     * Adds a photo to the current row.
     * @param photo - The photo object to add.
     */
    addPhoto(photo: Photo): void;

    /**
     * Calculates the total width of the current row (based on the target height).
     * @returns The total width of the current row.
     */
    getCurrentWidth(): number;

    /**
     * Calculates the row height and the display size of each photo.
     */
    calculate(): void;
}

/**
 * Represents the entire gallery.
 */
declare class Gallery {
    photos: Photo[];
    container: HTMLElement;
    targetHeight: number;
    margin: number;
    rows: Row[];
    containerWidth?: number;

    /**
     * Creates an instance of Gallery.
     * @param photos - The array of photo objects.
     * @param containerId - The ID of the container element.
     * @param options - The configuration options.
     * @param options.targetHeight - The target height of the rows.
     * @param options.margin - The margin between photos.
     */
    constructor(photos: Photo[], containerId: string, options: { targetHeight: number, margin: number });

    /**
     * Binds event listeners.
     */
    bindEvents(): void;

    /**
     * Debounce function to limit the frequency of function calls.
     * @param func - The function to be debounced.
     * @param wait - The wait time in milliseconds.
     * @returns The debounced function.
     */
    debounce(func: Function, wait: number): Function;

    /**
     * Performs the layout algorithm to arrange photos into rows.
     */
    layout(): void;

    /**
     * Renders the gallery to the page.
     */
    render(): void;

    /**
     * Initializes the gallery, performs layout and rendering.
     */
    init(): void;
}