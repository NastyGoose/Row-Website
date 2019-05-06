import React, { PureComponent } from 'react';
import { Parallax, ParallaxProvider } from 'react-scroll-parallax';
import Time from '../utilComponents/utilFunctions';
//component

const ipsum = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\n' +
        '\n';

const Banner = (props) =>(
    <div>
        <div>
            <ParallaxProvider>
                <main>
                    <nav />
                    <HeroBanner
                         min={'-20%'}
                        max={'20%'}
                        image= {props.picture}
                    >
                        {props.text}
                    </HeroBanner>
                </main>
            </ParallaxProvider>
        </div>
    </div>
);

const HeroBanner = ({ image, min, max, children }) => (
    <div className="hero-container">
        <Parallax offsetYMin={min} offsetYMax={max} slowerScrollRate>
            <div
                className="hero-image"
                style={{ backgroundImage: `url(${image})` }}
            />
        </Parallax>
        <div className="hero-children">{children}</div>
    </div>
);

class Homepage extends PureComponent {

    constructor() {
        super();
        this.state = {
            text: 'a good',
            magicWord: '',
            today: Time.whatDayIsItToday(),
            greetingsTime: Time.whatTimeIsItNow(),
            previousWord: ''
        };
        this.writeText();
    }

    changeState = () => {
        const magicWords = ['a blessed', 'fun', 'a terrific', 'an awesome', 'a good', 'a neat', 'beautiful', 'a cool', 'a nice'];
        let statement;
        do {
            let index = Math.floor(Math.random() * (magicWords.length));
            statement = magicWords[index];
        } while (this.state.previousWord === statement);
        this.setState({
            text: statement,
            previousWord: statement
        });
        this.writeText();
     };

    deleteText = () => {
        this.interval = setInterval(() => {
            let word = this.state.magicWord;
            let letters = word.split('');
            letters.pop();
            this.setState({magicWord: letters.join('')});
            if(!this.state.magicWord) {
                clearInterval(this.interval);
                this.changeState();
            }
            }, 135);

    };

    writeText = () => {
    this.interval = setInterval(() => {
        if(this.state.text) {
        let word = this.state.text;
        let letters = word.split('');
        this.setState({magicWord: this.state.magicWord + letters.shift()});
        this.setState({text: letters.join('')});
            if(!this.state.text) {
                clearInterval(this.interval);
                setTimeout(this.deleteText, 5000);
            }} }, 135);

    };

    render()
    {
        const telling =
            <h1>
                At this website <strong>you</strong> can read some <strong>information</strong> about our projects, us or just checkout <strong>design</strong>.
            </h1>;

        const greetings =
            <h1>
                {this.state.greetingsTime} we are <strong>
                    <mark className='BartMarker'>Bart!</mark>
            </strong>
            </h1>;

        return (
    <div>
        <Banner
            text={greetings}
            picture= {require('../../assets/images/night-landscape.jpg')}
        />
            <div
                className='container-fluid'
                style={{ height: '700px' }}>
                <h1>
                    About us:
                </h1>
                <div className='firstSpeech'>
                    <p className='firstLine'>
                        Our <mark>shiny company</mark> specialize on making small projects.
                    </p>
                <br/>
                    <p className='secondLine'>
                        For now we already made one baggy RTS <mark>game</mark> and currently we are trying to make <br/>it better.
                    </p>
                <br/>
                    <p className='thirdLine'>
                        We really appreciate <mark>you</mark> being on this website and hope you're liking it!
                    </p>
                </div>
            </div>

        <Banner
            text={telling}
            picture = {require('../../assets/images/landscape.jpg')}
        />

        <div
            className='container-fluid'
            style={{ height: '700px' }}>
            <div className='secondSpeech'>
                <p className='secondLine'>{ipsum}</p>
            </div>
            <div className='magicText'>
                <h1>
                    Have <strong style = {{color: 'chocolate'}}>{this.state.magicWord}</strong> {this.state.today}!
                </h1>
            </div>
        </div>
    </div>
        )
    }

}

export default Homepage;




