import Newsletter from '../components/Newsletter';
import Workflow from '../components/Workflow';
import Testimonials from '../components/Testimonials';
import illustration_hero from '../assets/img/illustration-hero.svg'


const HomePage = () => {
  return (
    < main className='overflow-x-hidden'>
      <section className="hero">
        <div className="container flex flex-col-reverse mx-auto p-6 lg:flex-row lg:mb-0">
        
          <div className="flex flex-col space-y-10 lg:mt-16 lg:w-1/2">
            <h1 className="text-3xl font-semibold text-white text-center lg:text-5xl lg:text-left">A Simple Book Mark</h1>
            <p className="max-w-md mx-auto text-lg text-center lg:text-left lg:max-0">
              A clean and simple interface to organize your favourite websites. Open a new browser tab and see your sites load instantly. Try it for free.
            </p>
          </div>

          <div className="relative mx-auto lg:mx-0 lg:mb-0 lg:w-1/2">
            <div className="bg-hero"></div>
            <img 
            src={illustration_hero} 
            alt="" 
            className="relative lg:top-24 xl:top-0 overflow-x-visible"
            />
          </div>
        </div>
      </section>

      <section>
        <div className="container mx-auto mt-16 px-6">
          <h2 className="mb-6 text-4xl text-white font-semibold text-center">Features</h2>
          <p className="max-w-md mx-auto text-center">
              Our aim is to make it quick and easy for you to access your favourite
              websites. Your bookmarks sync between your devices so you can access
              them on the go.
          </p>
        </div>
      </section>
      <Workflow/>
      <Testimonials/>
      <Newsletter/>
      
    </main>
    
  )
}

export default HomePage