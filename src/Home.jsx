import { useState } from "react"

export default function Home() {
    const [errors, setErrors] = useState({})
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
            setFormData({
                cardName: '',
                cardNumber: '',
                month: '',
                year: '',
                cvc: ''
            })
        }
        return isValid
    }

    return (
        <main>
            <div className="relative px-4 pt-8 pb-16 flex flex-col-reverse bg-[url('./assets/images/bg-main-mobile.png')] bg-no-repeat bg-cover md:bg-[url('./assets/images/bg-main-desktop.png')]">
                <div className="absolute top-29.5 z-50 text-white">
                    <img src="./assets/images/bg-card-front.png" alt="" className="w-70"/>
                    <img src="./assets/images/card-logo.svg" alt="" className="absolute top-0 p-5 w-25"/>
                    <div className="absolute top-20 px-5 w-full">
                        <h1 className="text-xl mb-2 w-full tracking-wider">{formData.cardNumber || "0000 0000 0000 0000"}</h1>
                        <div className="flex justify-between text-xs">
                            <p className="uppercase">{formData.cardName || "Jane Appleseed"}</p>
                            <p>{formData.month || "00"}/{formData.year || "00"}</p>
                        </div>
                    </div>
                </div>
                <div className="relative flex justify-end">
                    <img src="./assets/images/bg-card-back.png" alt="" className="w-70" />
                    <p className="absolute top-16.5 right-10 text-sm text-white">{formData.cvc || "000"}</p>
                </div>
            </div>

    
            <form className="py-18 px-6 font-bold text-sm">
                <label className="uppercase block mb-1 text-very-dark-violet">Cardholder Name</label>
                <input type="text" 
                        name="cardName" 
                        placeholder="e.g. Jane Appleseed" 
                        className={`mb-5 outline-0 border ${errors.cardName ? 'border-red' : 'border-light-grayish-violet'} w-full p-3 rounded-lg placeholder:text-dark-grayish-violet placeholder:text-lg`}
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

                <button type="submit" className="bg-very-dark-violet w-full text-white py-4 rounded-lg mt-2 text-lg"
                onClick={(event) => {
                    event.preventDefault()
                    event.stopPropagation()
                    validate()
                }}
                >Confirm</button>
            </form>

            <div className="py-18 px-6 text-center text-very-dark-violet">
                <div className="flex justify-center mb-6"><img src="./assets/images/icon-complete.svg" alt="complete icon" /></div>
                <h1 className="uppercase font-bold mb-2 text-xl tracking-widest">Thank You!</h1>
                <p className="text-sm font-bold text-dark-grayish-violet">We've added your card details</p>
            </div>
        </main>
    )
}