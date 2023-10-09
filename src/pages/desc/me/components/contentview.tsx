import { useEmotionCss } from '@ant-design/use-emotion-css';

const Contentview: React.FC = () => {
  const className = useEmotionCss(() => {
    return {
      '.item': {
        '.title': {
          fontSize: '1.4em',
          lineHeight: '1.2',
          fontWeight: 'bold',
          margin: '1em 0 0.5em',
        },

        'ul > li': {
          marginBottom: '0.5em',
          fontSize: '1em',
        },

        a: {
          color: 'black',
          textDecoration: 'underline',
        },
      },
    };
  });

  return (
    <div className={className}>
      <div className="item">
        <div className="title">🏆 Honors and Awards</div>
        <ul>
          <li>
            (2017-2021) Author won a total of seven university scholarships, including three special
            scholarships, three first-class scholarships, and one second-class scholarship.
          </li>
          <li>
            (2017-2020) Author won the honorary title of &quot;Excellent Student&quot; at the
            university level for three consecutive years.
          </li>
        </ul>
      </div>
      <div className="item">
        <div className="title">📖 Educations</div>
        <ul>
          <li>
            2021.09 - 2023.06. Master. Shanghai Maritime University. Software Engineering. GPA:
            89/100
          </li>
          <li>
            2017.09 - 2021.06. Bachelor. Beijing Institute Of Technology, Zhuhai. Computer Science
            and Technology. GPA: 4.0/5.0
          </li>
        </ul>
      </div>
      <div className="item">
        <div className="title">💻 Internships</div>
        <ul>
          <li>
            2022.08 - 2023.04.{' '}
            <a href="http://www.jhlfund.com/about" target="_blank" rel="noopener noreferrer">
              Evoluation Asset Management,Ltd
            </a>
            . Full-Stack Developer Intern.
          </li>
          <li>
            2022.04 - 2022.07.{' '}
            <a href="http://datauseful.com/AboutUs-2/" target="_blank" rel="noopener noreferrer">
              Shanghai Yousifu Information Technology Co.,Ltd
            </a>
            . Go Developer Intern.
          </li>
          <li>
            2021.03 - 2021.07.{' '}
            <a
              href="http://www.jore-tech.com/frontAboutUs.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              Zhuhai Jierui Technology Co.,Ltd
            </a>
            . Java Developer Intern.
          </li>
        </ul>
      </div>
      <div className="item">
        <div className="title">👔 Experiences</div>
        <ul>
          <li>
            2023.06 - now.{' '}
            <a href="http://www.jhlfund.com/about" target="_blank" rel="noopener noreferrer">
              Evoluation Asset Management,Ltd
            </a>
            . Full-Stack Developer.
          </li>
        </ul>
      </div>
      <div className="item">
        <div className="title">🎯 Projects</div>
        <ul>
          <li>xx</li>
          <li>xx</li>
        </ul>
      </div>
    </div>
  );
};

export default Contentview;
