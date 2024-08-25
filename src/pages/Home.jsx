import React from "react";
import OptionSelector from "../components/OptionSelector";
import PasswordLengthControl from "../components/PasswordLengthControl";
import PasswordDisplay from "../components/PasswordDisplay";
import PasswordExplanation from "../components/PasswordExplanation";
import ActionButtons from "../components/ActionButtons";
import styled from "styled-components";
import '../styles/Home.css';

const BackgroundColor = styled.div`
          position: "absolute",
          top: "200px",
          width: "clamp(100px, 500px, 800px)",
          height: "clamp(100px, 500px, 800px)",
          backgroundColor: "rgba(254 225 64, 0.5)",
          backgroundImage: "linear-gradient(90deg, rgba(254 225 64, 0.5) 0%, rgba(250 112 154, 0.5) 100%)",
          zIndex: 1,
          borderRadius: "50%", 
        `;

function Home() {
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
        backgroundColor: "transparent",
        color: "white",
        overflow: "scroll",
      }}
    >
      {/* <div
        style={{
          position: "absolute",
          top: "200px",
          width: "clamp(100px, 500px, 800px)",
          height: "clamp(100px, 500px, 800px)",
          backgroundColor: "rgba(254 225 64, 0.5)",
          backgroundImage: "linear-gradient(90deg, rgba(254 225 64, 0.5) 0%, rgba(250 112 154, 0.5) 100%)",
          zIndex: 1,
          borderRadius: "50%", 
        }}
      >
        f
      </div> */}
      {/* <div className='background-color'
      >
        f
      </div> */}
      <div style={{
  backgroundImage: `url("https://assets.getpartiful.com/backgrounds/aquatica/mobile.jpg"), linear-gradient(to right bottom, rgb(3, 3, 13) 40%, rgb(12, 42, 114) 55.4731%, rgb(60, 111, 192) 80%)`,
  animationDuration: '12s',
  zIndex: 1,
  position: 'fixed',
  top: 0,
  width: '100vw',
  height: '100vh',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  // backgroundRepeat: 'no-repeat',
}}>
  <div className="ptf-98OxY" style={{
    backgroundImage: `url("https://assets.getpartiful.com/backgrounds/aquatica/mobile.jpg"), linear-gradient(to right bottom, rgb(3, 3, 13) 40%, rgb(12, 42, 114) 55.4731%, rgb(60, 111, 192) 80%)`
  }}></div>
</div>

      <div
        style={{
          padding: "20px",
          zIndex: 1,
          backdropFilter: "blur(100px)",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          width: "100vw",
          borderRadius: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            width: "clamp(300px, 600px, 100vw)",
          }}
        >
          <h1>Password Generator</h1>
          <PasswordLengthControl />
          <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            width: "clamp(300px, 600px, 100vw)",
          }}>
            <PasswordDisplay />
          </div>
          <PasswordExplanation />
          <ActionButtons />
          <br />
          <OptionSelector />
        </div>
      </div>
    </div>
  );
}

export default Home;
