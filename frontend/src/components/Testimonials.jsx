import profile1 from "../assets/img/profile-1.jpg"
import profile2 from "../assets/img/profile-2.jpg"
import profile3 from "../assets/img/profile-3.jpg"
import {FaQuoteLeft} from "react-icons/fa";


const Testimonials = () => {
  return (
    <section className="ml-4">
        {/* <!-- Testimonials Container --> */}
        <div className="container mx-auto px-6 pt-12 mb-12">
            {/* <!-- Boxes Container --> */}
            <div className="relative flex flex-col w-full space-y-6 md:flex-row md:space-y-0 md:space-x-12">
                {/* <!-- Quotes --> */}
                <FaQuoteLeft className="absolute -left-8  -top-2 md:left-1 w-10 md:-top-16 text-4xl lg:text-8xl  text-white font-semibold"/>

                {/* <!-- Box 1 --> */}
                <div className="flex flex-col p-10 space-y-6 rounded-lg bg-slate-800 md:w-1/3">
                    <p className="text-sm leading-5 md:text-lg">
                        Fylo has improved our team productivity by an order of magnitude.
                        Since making the switch our team has become a well-oiled
                        collaboration machine.
                    </p>
                    {/* <!-- Customer Info --> */}
                    <div className="flex space-x-4">
                        <img src={profile1} alt="profile" className="w-10 h-10 rounded-full"/>
                        <div>
                            <h5 className="text-sm text-white font-semibold">Satish Patel</h5>
                            <p className="text-xs font-extralight">Founder and & CEO Huddle</p>
                        </div>
                    </div>
                </div>
                {/* <!-- Box 2 --> */}
                <div className="flex flex-col p-10 space-y-6 rounded-lg bg-slate-800 md:w-1/3">
                    <p className="text-sm leading-5 md:text-lg">
                        Fylo has improved our team productivity by an order of magnitude.
                        Since making the switch our team has become a well-oiled
                        collaboration machine.
                    </p>
                    {/* <!-- Customer Info --> */}
                    <div className="flex space-x-4">
                        <img src={profile2} alt="profile" className="w-10 h-10 rounded-full"/>
                        <div>
                            <h5 className="text-sm text-white font-semibold">Bruce McKenzie</h5>
                            <p className="text-xs font-extralight">Founder and & CEO Huddle 2</p>
                        </div>
                    </div>
                </div>
                {/* <!-- Box 3 --> */}
                <div className="flex flex-col p-10 space-y-6 rounded-lg bg-slate-800  md:w-1/3">
                    <p className="text-sm leading-5 md:text-lg">
                        Fylo has improved our team productivity by an order of magnitude.
                        Since making the switch our team has become a well-oiled
                        collaboration machine.
                    </p>
                    {/* <!-- Customer Info --> */}
                    <div className="flex space-x-4">
                        <img src={profile3} alt="profile" className="w-10 h-10 rounded-full"/>
                        <div>
                            <h5 className="text-sm text-white font-semibold">Eva Boyd</h5>
                            <p className="text-xs font-extralight">Founder and & CEO Huddle 3</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Testimonials