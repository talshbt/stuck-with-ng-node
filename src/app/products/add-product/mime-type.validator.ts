import { AbstractControl } from '@angular/forms';
import { Observable, Observer, of } from 'rxjs';

export const mimeType = (
  control: AbstractControl
): Promise<{ key: any }> | Observable<{ key: any }> => {
  if (typeof control.value === 'string') {
    return of(null);
  }
  const file = control.value as File;
  //to read file contetnt
  const fileReader = new FileReader();

  const readerObs = new Observable((observer: Observer<any>) => {
    // do the mime type validation after finish reading file
    fileReader.addEventListener('loadend', () => {
      let header = '';
      const arr = new Uint8Array(fileReader.result as ArrayBuffer).subarray(
        0,
        4
      );
      let isValid = false;
      arr.forEach((x) => {
        // convert to hexadecimal
        header += x.toString(16);
      });

      switch (header) {
        case '89504e47':
          isValid = true;
          break;
        case 'ffd8ffe0':
        case 'ffd8ffe1':
        case 'ffd8ffe2':
        case 'ffd8ffe3':
        case 'ffd8ffe8':
          isValid = true;
          break;
        default:
          isValid = false; // Or you can use the blob.type as fallback
          break;
      }

      console.log(isValid);
      observer.next(isValid ? null : { invalidMimeType: true });
      observer.complete();
    });
    //start the proccess of reading file

    fileReader.readAsArrayBuffer(file);
  });

  return readerObs;
};
