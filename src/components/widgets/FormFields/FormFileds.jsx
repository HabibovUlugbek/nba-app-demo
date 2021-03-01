import styles from './formFields.module.css'

const FomrFields = ({formData , change, id}) => {

 const showerror = () => {
     let errorMessage = null;

     if (formData.validation && !formData.valid) {
         errorMessage = <label className={styles.labelError} >{formData.validationMessage}</label>
     }

     return errorMessage
 }

    const renderTemplate = ( ) => {
        let FormTemplate = null;
        switch (formData.element) {
            case 'input':
                FormTemplate = (
                    <div>
                        <input {...formData.config}
                        value={formData.value}
                        onBlur={(e) => change({e , id , blur:true})}
                        onChange={(e) => change({e , id , blur:false})} />
                        {showerror()}
                    </div>
                )
                break;
            case 'select' :
                
                FormTemplate = (
                    <div>
                        <select 
                        name={formData.config.name}  
                        value={formData.value}
                        onBlur={(e) => change({e , id , blur:true})}
                        onChange={(e) => change({e , id , blur:false})} >
                            { formData.config.options.map((item , i) => (
                                <option key={i}  value={item.id}>{item.name}</option>
                            ))}
                        </select>
                    </div>
                ) 
                break ;
            default:
            FormTemplate = null;
        }

        return FormTemplate;
    }

    return ( 
        <div>
            {renderTemplate()}
        </div>
     );
}
 
export default FomrFields;