import '../../css/home/hero.css'

const Hero = () => {
    return(
        <div className='hero'>
            <div id='banner-hero'/>
            <h1 class="animate__animated animate__backInLeft" id='black'>Create Blogs on Technology</h1>
            <h1 class="animate__animated animate__backInRight" id='white'>and share with the World.</h1>

            <p id='intro'><i>"Read and share ideas from independent people from around the Globe."</i></p>
        </div>
    )
}

export default Hero;