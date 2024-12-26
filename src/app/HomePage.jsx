import ContactForm from './components/ContactForm';
import Image from 'next/image';
import "./styles/HomePage.css";

const HomePage = () => {
  return (
    <main className='home-container'>
      <div className='intro-section'>
        <div className='background-image-container'>
          <Image 
            src='/images/mar.png' 
            alt='emfBeach' 
            height={1000}
            width={1000}
            className='background-image'
          >
          </Image>
        </div>
        <div className='intro-text-container'>
          <p className='intro-heading'>
            Get Strong, Get Fit
          </p>
          <p className="intro-text">
            Personalized Training Programs <br></br>
            1-on-1 Support <br></br>
            Hybrid Styles of Training <br></br>
          </p>
          <p className='founder-intro'>
            Reach your goals fast, without compromising safety <br></br>
            <span className='text-sm align-top'>-Miguel Ramirez</span>
          </p>
        </div>
      </div>
      <ContactForm />
    </main>  
  )
}

export default HomePage