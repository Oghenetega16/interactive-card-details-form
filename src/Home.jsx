import { useState } from "react"

export default function Home() {
    const [errors, setErrors] = useState({})
    const [result, setResult] = useState(false)
    const [formData, setFormData] = useState({
        cardName: '',
        cardNumber: '',
        month: '',
        year: '',
        cvc: ''
    })

    function handleChange(event) {
        const { name, value } = event.target

        if (name === "cardNumber") {
            const raw = value.replace(/\D/g, "").slice(0, 16)
            const formatted = raw.replace(/(\d{4})(?=\d)/g, "$1 ")
            setFormData((prev) => ({...prev, cardNumber: formatted}))
        } else if (name === "month") {
            const raw = value.replace(/\D/g, "").slice(0, 2)
            setFormData((prev) => ({...prev, month: raw}))
        } else if (name === "year") {
            const raw = value.replace(/\D/g, "").slice(0, 2)
            setFormData((prev) => ({...prev, year: raw}))
        } else if (name === "cvc") {
            const raw = value.replace(/\D/g, "").slice(0, 3)
            setFormData((prev) => ({...prev, cvc: raw}))
        }
        else {
            setFormData((prev) => ({...prev, [name]: value}))
        }
    }

    function validate() {
        const newErrors = {}

        if (!formData.cardName.trim()) {
            newErrors.cardName = 'Name cannot be empty'
        }

        if (!formData.cardNumber.trim()) {
            newErrors.cardNumber = 'Provide card number';
        } else if (!/^\d{4} \d{4} \d{4} \d{4}$/.test(formData.cardNumber)) {
            newErrors.cardNumber = 'Wrong format, numbers only';
        }

        if (!formData.month.trim()) {
            newErrors.month = "Can't be blank";
        } else if (!/^\d{1,2}$/.test(formData.month)) {
            newErrors.month = 'Invalid month';
        }

        if (!formData.year.trim()) {
            newErrors.year = "Can't be blank";
        } else if (!/^\d{1,2}$/.test(formData.year)) {
            newErrors.year = 'Invalid year';
        }

        if (!formData.cvc.trim()) {
            newErrors.cvc = "Can't be blank";
        } else if (!/^\d{3,4}$/.test(formData.cvc)) {
            newErrors.cvc = 'Invalid CVC';
        }

        setErrors(newErrors)
        const isValid = Object.keys(newErrors).length === 0

        if (isValid) {
            return isValid
        }
    }

    function handleSubmit(event) {
        event.preventDefault()
        event.stopPropagation()
        if (validate()) {
            setResult(!result)
        }
    }

    function handleResult() {
        setResult(!result)
        setFormData({
            cardName: '',
            cardNumber: '',
            month: '',
            year: '',
            cvc: ''
        })
    }

    return (
        <main className="min-h-screen md:flex md:items-center md:justify-center">
            <div className="relative px-4 pt-8 pb-16 flex flex-col-reverse bg-[url('./assets/images/bg-main-mobile.png')] bg-no-repeat bg-cover md:bg-[url('./assets/images/bg-main-desktop.png')] md:w-2/5 md:min-h-screen">
                <div className="absolute top-29.5 z-50 text-white md:absolute md:-right-15 lg:top-25 lg:-right-30">
                    <img src="./assets/images/bg-card-front.png" alt="" className="w-70 xl:w-auto"/>
                    <img src="./assets/images/card-logo.svg" alt="" className="absolute top-0 p-5 w-25 lg:w-auto"/>
                    <div className="flex flex-col gap-2 absolute top-20 px-5 w-full lg:top-37 lg:px-7 lg:gap-4">
                        <h1 className="text-xl w-full tracking-wider lg:text-3xl lg:tracking-widest">{formData.cardNumber || "0000 0000 0000 0000"}</h1>
                        <div className="flex justify-between text-xs lg:text-sm">
                            <p className="uppercase">{formData.cardName || "Jane Appleseed"}</p>
                            <p>{formData.month || "00"}/{formData.year || "00"}</p>
                        </div>
                    </div>
                </div>
                <div className="relative flex justify-end md:absolute md:-right-30 md:top-75 lg:top-90 lg:-right-60">
                    <img src="./assets/images/bg-card-back.png" alt="" className="w-70 xl:w-auto" />
                    <p className="absolute top-16.5 right-10 text-sm text-white lg:top-27.5 lg:right-13">{formData.cvc || "000"}</p>
                </div>
            </div>

            <div className="md:w-3/4 md:ml-20">
                {!result ? <form className="py-18 px-6 font-bold text-sm md:w-90 mx-auto lg:w-100">
                    <label className="uppercase block mb-1 text-very-dark-violet">Cardholder Name</label>
                    <input type="text" 
                            name="cardName" 
                            placeholder="e.g. Jane Appleseed"
                            className={`mb-5 outline-none bg-white border ${errors.cardName ? 'border-red' : 'border-light-grayish-violet'} w-full p-3 rounded-lg placeholder:text-dark-grayish-violet placeholder:text-lg`}
                            value={formData.cardName}
                            onChange={handleChange}
                    />
                    {errors.cardName && <p className="text-red text-xs -mt-5 mb-5">{errors.cardName}</p>}

                    <label className="uppercase block mb-1 text-very-dark-violet">Card Number</label>
                    <input type="text"
                            name="cardNumber"
                            placeholder="e.g. 1234 5678 9123 0000"
                            className={`mb-5 outline-0 border ${errors.cardNumber ? 'border-red' : 'border-light-grayish-violet'} w-full p-3 rounded-lg placeholder:text-dark-grayish-violet placeholder:text-lg`}
                            value={formData.cardNumber}
                            onChange={handleChange}
                    /> 
                    {errors.cardNumber && <p className="text-red text-xs -mt-5 mb-5">{errors.cardNumber}</p>}

                    <div className="flex mb-1 space-x-5 text-very-dark-violet">
                        <div className="space-x-1">
                            <label className="uppercase tracking-wider">Exp. date</label>
                            <label className="uppercase tracking-wider">(mm/yy)</label>
                        </div>
                        <label className="uppercase">cvc</label>
                    </div>

                    <div className="flex space-x-2 mb-6">
                        <div className="flex w-1/2 space-x-2">
                            <div>
                                <input type="text"
                                        name="month" 
                                        placeholder="MM" 
                                        className={`outline-0 border ${errors.month ? 'border-red' : 'border-light-grayish-violet'} w-full p-3 rounded-lg placeholder:text-dark-grayish-violet placeholder:text-lg`}
                                        value={formData.month}
                                        onChange={handleChange}
                                />
                                {errors.month && <p className="text-red text-xs mt-1 mb-5">{errors.month}</p>}
                            </div>

                            <div>
                                <input type="text"
                                        name="year" 
                                        placeholder="YY" 
                                        className={`outline-0 border ${errors.year ? 'border-red' : 'border-light-grayish-violet'} w-full p-3 rounded-lg placeholder:text-dark-grayish-violet placeholder:text-lg`}
                                        value={formData.year}
                                        onChange={handleChange}
                                />
                                {errors.year && <p className="text-red text-xs mt-1 mb-5">{errors.year}</p>}
                            </div>
                        </div>
                        
                        <div>
                            <input type="text"
                                    name="cvc"
                                    placeholder="e.g. 123"
                                    className={`outline-0 border ${errors.cvc ? 'border-red' : 'border-light-grayish-violet'} w-full p-3 rounded-lg placeholder:text-dark-grayish-violet placeholder:text-lg`}
                                    value={formData.cvc}
                                    onChange={handleChange}
                            />
                            {errors.cvc && <p className="text-red text-xs mt-1 mb-5">{errors.cvc}</p>}
                        </div>
                    </div>

                    <button type="submit" 
                            className="bg-very-dark-violet w-full text-white py-3 rounded-lg mt-2 text-lg cursor-pointer"
                            onClick={handleSubmit}>Confirm
                    </button>
                </form> :

                <div className="py-18 px-6 text-center text-very-dark-violet md:w-90 mx-auto lg:w-100">
                    <div className="flex justify-center mb-6"><img src="./assets/images/icon-complete.svg" alt="complete icon" /></div>
                    <h1 className="uppercase font-bold mb-2 text-xl tracking-widest">Thank You!</h1>
                    <p className="text-sm font-bold text-dark-grayish-violet lg:mb-6">We've added your card details</p>
                    <button className="bg-very-dark-violet w-full text-white py-3 rounded-lg mt-5 text-lg cursor-pointer" onClick={handleResult}>Confirm</button>
                </div> }
            </div>
        </main>
    )
}