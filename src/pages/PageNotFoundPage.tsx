import React from 'react';

const PageNotFoundPage: React.FC = () => {
    return (
        <div>
            <h1 style = {{fontWeight:'bold', color: 'red'}}>404 - Page Not Found</h1>
            <p>The page you are looking for does not exist.</p>
            <img src="https://media.istockphoto.com/id/1200474333/photo/lifebuoy-404.jpg?s=2048x2048&w=is&k=20&c=0PK2YdpdNxc25ERPqjywNn6NFx8NfwJpRDlvQcGAjNI="/>
            
        </div>
    );
};

export default PageNotFoundPage;