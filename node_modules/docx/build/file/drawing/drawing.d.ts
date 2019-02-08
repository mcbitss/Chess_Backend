import { IMediaData } from "../../file/media";
import { XmlComponent } from "../../file/xml-components";
import { IFloating } from "./floating";
import { ITextWrapping } from "./text-wrap";
export declare enum PlacementPosition {
    INLINE = 0,
    FLOATING = 1
}
export interface IDistance {
    readonly distT?: number;
    readonly distB?: number;
    readonly distL?: number;
    readonly distR?: number;
}
export interface IDrawingOptions {
    readonly position?: PlacementPosition;
    readonly textWrapping?: ITextWrapping;
    readonly floating?: IFloating;
}
export declare class Drawing extends XmlComponent {
    private readonly inline;
    constructor(imageData: IMediaData, drawingOptions?: IDrawingOptions);
    scale(factorX: number, factorY: number): void;
}
