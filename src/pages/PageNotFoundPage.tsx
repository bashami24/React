import React from 'react';

const PageNotFoundPage: React.FC = () => {
    return (
        <div>
            <h1 style = {{fontWeight:'bold', color: 'red'}}>404 - Page Not Found</h1>
            <p>The page you are looking for does not exist.</p>
        </div>
    );
};

export default PageNotFoundPage;