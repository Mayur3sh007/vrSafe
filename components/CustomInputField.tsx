import {
    FormControl,
    FormField,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { AuthFormSchema } from "@/lib/utils"
import { Control, FieldPath } from "react-hook-form"
import { FilePath } from "tailwindcss/types/config"
import { z } from "zod"

const formSchema = AuthFormSchema('sign-up');   //coz we need it for all the options

interface CustomInputProps{
    control: Control<z.infer<typeof formSchema>>,
    // name: 'email' | 'password',  But what if we have to add new field then we would have to specify it in our utils here too with our Authform
    name: FieldPath<z.infer<typeof formSchema>>, //now our name knows that it should be email or password only depending on the
    label:string,
    placeholder: string
}

const CustomInputField = ({control,name,label,placeholder} : CustomInputProps) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <div className="form-item">
                    <FormLabel className="form-label">
                        {label}
                    </FormLabel>
                    <div className="flex flex-col w-full">
                        <FormControl>
                            <Input
                                placeholder={placeholder}
                                className="input-class"
                                type={name === 'password' ? 'password' : 'text'}    //Conditionally Changing type for password field
                                {...field}
                            />
                        </FormControl>
                        <FormMessage className="form-message mt-2" />
                    </div>
                </div>
            )}
        />
    )
}

export default CustomInputField