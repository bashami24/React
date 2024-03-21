import React from 'react';


const HomePage: React.FC = () => {
    return (
        <div>
            <h1 style= {{ marginLeft: '130px'}}>Welcome!</h1>
            <p style = {{ fontStyle: 'italic', marginLeft: '40px'}}>Let us help you track your seller/product transactions.</p>
            <img src="https://media.istockphoto.com/id/517373852/photo/homepage-domain-html-web-design-concept.jpg?s=2048x2048&w=is&k=20&c=cbfan54AagEh71848REDxEG4sc5n9wqLZrv-spmuk14=" style={{width: '450px', height: 'auto', margin: '15px',}}/>
            

        </div>
    );
};

export default HomePage;