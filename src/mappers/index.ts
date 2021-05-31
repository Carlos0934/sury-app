export interface Mapper<T  , D> {
    dataToDTO : (data : T) => D | Promise<D>
    DTOToData : (DTO : D) => T | Promise<T>

}


