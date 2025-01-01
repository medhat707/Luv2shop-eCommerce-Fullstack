import { FormControl, ValidationErrors } from "@angular/forms";

export class Luv2ShopValidators {

    /* for handling not only whitespaces 
    if we've just whitespaces and the field is required
    then display an error
    because we can not write white spaces
    */

    static notOnlyWhiteSpace(control: FormControl): ValidationErrors{

        // check if the field is not null and if we trimmed string length is 0
        // then we've whitespaces
        if(control.value!=null && control.value.trim().length===0){
            // display an error
            return {'notOnlyWhiteSpace' : true} ;
        }
            else{
                // if valid return null
                return null;
            }
        }
    
}
