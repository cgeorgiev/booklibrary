import React from 'react';

const Footer = () => {

    var year = new Date().getFullYear();

    return (
        <footer>
            <p>&copy;{year} Book Library Ltd.</p>
        </footer>
    )

}

export default Footer;