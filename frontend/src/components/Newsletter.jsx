

const Newsletter = () => {
  return (
    <section className="bg-softBlue">
        <div className="max-w-lg mx-auto py-24">
            <p className="mb-6 text-lg tracking-widest text-center text-white uppercase">
                35, 000+ Already Joined
            </p>
            <h2 className="px-3 mb-6 text-3xl font-semibold text-center text-white md:text-4xl">
           
            </h2>
            <form className="flex flex-col items-start justify-center max-w-2xl mx-auto space-y-6 text-base px-6 md:flex-row md:space-y-0 md:space-x-4 md:px-0">
                <div className="flex flex-col justify-between items-center mx-auto md:flex-row md:mx-0">
                <input
                    type="text"
                    className="flex-1 px-6 pt-3 pb-2 mb-4 rounded-lg border-1 border-white focus:outline-none md:mr-3 md:mb-0"
                    placeholder="Votre Adresse Email"
                />
                <input
                    type="submit"
                    className="inline-flex px-6 py-3 font-semibold text-center text-white duration-200 transform rounded-lg cursor-pointer focus:outline-none bg-slate-800 hover:opacity-90"
                    value="Contact Us"
                />
                </div>
            </form>
        </div>
    </section>
  )
}

export default Newsletter