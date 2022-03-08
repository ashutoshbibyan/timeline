

export class FileListStub {

 fileList: File[] ;

 length: number ;

 constructor(files: File[]){
  this.fileList = files ;
  this.length = files.length;

}

 item(index: number ): File{
    return this.fileList[index];
  }



}

