import icon_blacklist from "../assets/img/icon-blacklist.svg";
import icon_text from "../assets/img/icon-text.svg";
import icon_preview from "../assets/img/icon-preview.svg";

const Workflow = () => {
  return (
    <section className="lg:px-24 ml-4">
        <div className="my-20">
        <h3 className="text-4xl font-semibold text-center text-white">Supercharge your workflow</h3>
        <p className="mb-16 text-xl text-center">
            We've got the tools to boost your productivity.
        </p>
        {/* <!-- Items Container --> */}
        <div className="flex flex-col items-center justify-between space-y-16 md:flex-row md:space-y-0 md:space-x-12" >
            {/* Item 1  */}
            <div className="flex flex-col items-center space-y-5">
                <img src={icon_blacklist} alt="" className="mb-6" color={"white"} />
                <h5 className="mb-2 text-2xl font-bold text-gray-300">Create Blacklists</h5>
                <p className="max-w-md ">
                    Easily search your snippets by content, category, web address,
                    application, and more.
                </p>
            </div>

            {/* Item 2  */}
            <div className="flex flex-col items-center space-y-5">
            <img src={icon_text} alt="" className="mb-6" />
            <h5 className="mb-2 text-2xl font-bold text-gray-300">Plain Text Snippets</h5>
            <p className="max-w-md ">
                Remove unwanted formatting from copied text for a consistent look.
            </p>
            </div>

            {/* <!-- Item 3 --> */}
            <div className="flex flex-col items-center space-y-5">
            <img src={icon_preview} alt="" className="mb-6" />
            <h5 className="mb-2 text-2xl font-bold text-gray-300">Sneak Preview</h5>
            <p className="max-w-md">
                Quick preview of all snippets on your Clipboard for easy access.
            </p>
            </div>
        </div>
        </div>
    </section>

    
  )
}

export default Workflow;