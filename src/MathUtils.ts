export default class MathUtils {
    static rangeMap = (
        value: number, 
        min1: number, 
        max1: number, 
        min2: number, 
        max2: number
        ): number => (((value - min1) / (max1 - min1)) * (max2 - min2)) + min2;
}