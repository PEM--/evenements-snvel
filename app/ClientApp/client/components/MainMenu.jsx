import radium from 'radium';
import {palette, styles} from '../../../entry/client/styles/index';

var Menu = require('react-burger-menu').bubble;

const MainMenu = radium(({isOpen}) => (
  <Menu isOpen={isOpen}>
    <a id="home" className="menu-item" href="/">Home</a>
    <a id="about" className="menu-item" href="/about">About</a>
    <a id="contact" className="menu-item" href="/contact">Contact</a>
  </Menu>
));

export default MainMenu;
