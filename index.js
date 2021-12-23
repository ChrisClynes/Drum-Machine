//--------drum clips array------------------------------------------------
const drumClips = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
];

//-----------------------Drum Pad Component---------------------------------------
class DrumPad extends React.Component {
  constructor(props) {
    super(props);
    
    this.audio = React.createRef();
    this.playSound = this.playSound.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  playSound = () => {
    this.audio.current.currentTime = 0;//stops current playing audio to play new audio, increases tap speed when pressed
    this.audio.current.volume = this.props.currentVolume;
    this.audio.current.play();

    const parent = this.audio.current.parentNode;//only used if you need access to parent of this component, a hack not needed for this but here for reference
    parent.classList.add('active');

    const id = this.audio.current.id;
    document.getElementById('drum-display').innerText = this.props.padName;
  }
  componentDidMount() {//executes right after component is rendered
    document.addEventListener('keydown', this.handleKeyPress);
  }
  componentWillUnmount() {//called immediately before the component is removed from the DOM. It is generally used to perform clean-up
    document.removeEventListener('keydown', this.handleKeyPress);
  }
  handleKeyPress(e) {
    if (e.keyCode === this.props.keyCode) {
      console.log(this.props.keyCode);//displays keycode 
      this.playSound();
    }
  }
  render() {
    const {text, audio, padName} = this.props;

    return (
      <div className="box">
          <button id= "drum-pad-id" className="drum-pad" onClick={this.playSound}>
              {this.props.text}<audio ref={this.audio} src={audio} className="clip" id={text} />
          </button>
      </div>
    );
  }
}

//-----------------------Volume Component---------------------------------------
const VolumeControl = (props) => (
  <div className="volume-container justify-content-md-center align-items-center">
    <div id="volume-text">Volume</div>
    <input 
      id="volume-slider" 
      type="range" 
      step="0.01" 
      min="0" 
      max="1" 
      value={props.currentVolume} //pulled from parent soundVolume state
      onChange={(e) => props.updateVolume(e.target.value)} //triggers function on the rendered components property updateVolume using sliders value
    /> 
  </div>
);

//-----------------------Main App Component---------------------------------------
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      soundVolume: 0.1
      }
    }
      render() {
        return (
          <div id="display">
            <div id="machine-container" className="container d-flex justify-content-md-center align-items-center vh-100">
                <div id="drum-machine" >
                  <div id="drum-pads">
                      {drumClips.map((trigger) => (
                        <DrumPad text={trigger.keyTrigger} audio={trigger.url} keyCode={trigger.keyCode} padName={trigger.id} currentVolume={this.state.soundVolume}/>
                      ))}
                  </div>
                  <div id="controls-container" className="d-flex float-right justify-content-md-center align-items-center">
                    <div id="drumMachine-title">Drum Machine</div>
                    <div id="drum-display">Click Pads</div>    
                    <VolumeControl currentVolume ={this.state.soundVolume} updateVolume={sliderVolume => this.setState({soundVolume: sliderVolume})}/>
                  </div>
                </div>
            </div>
          </div>
        );
    }    
}

ReactDOM.render(<App />, document.getElementById("root"));