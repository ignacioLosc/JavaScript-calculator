import packageJson from '../../../package.json';
import "./footer.css";

const Footer = () => {
    const currentYear = new Date().getFullYear();
  
    return (
          <ul>
            <li className="footerCopyrights">
              Designed and coded by
            </li>
            <li className="footyli">
              <a
                  href="https://github.com/ignacioLosc"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cy="githubLink"
              >
                ignacioLosc {currentYear}
              </a>
            </li>
            
            <li>
              <div className="version">v.{packageJson.version}</div>
            </li>
          </ul>
    );
  };
  export default Footer;