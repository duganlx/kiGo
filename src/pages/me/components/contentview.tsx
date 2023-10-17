import { CatalogItem } from '@/services/github';
import { useEmotionCss } from '@ant-design/use-emotion-css';

interface ContentviewProps {
  catalog: CatalogItem[];
}

const Contentview: React.FC<ContentviewProps> = (props) => {
  const { catalog } = props;
  const pageBlogsurl = '/wc/blogs';

  const className = useEmotionCss(() => {
    return {
      lineHeight: '1.5',
      fontSize: '15px',
      paddingRight: '10px',

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
          color: '#224b8d',
          textDecoration: 'underline',
        },

        '.label-showcase': {
          height: '300px',
          // backgroundColor: 'yellow',
        },
      },
    };
  });

  return (
    <div className={className}>
      <div className="item">
        <p>
          I am currently working as a full stack developer in{' '}
          <a href="http://www.jhlfund.com/about" target="_blank" rel="noopener noreferrer">
            Evoluation Asset Management,Ltd
          </a>
          . in Shenzhen, China. I am responsible for the construction and maintenance of QuantWeb,
          the company&apos;s system center, so as to better support the work of colleagues in other
          business departments of the company. The specifics of the work can be abstracted into four
          areas, specifically:
          <ol>
            <li>
              (Analysis) When a colleague from another department raises a new requirement, I need
              to communicate with that colleague to understand his claim and the desired effect.
              Next, I need to assess the value and urgency of the requirement.
            </li>
            <li>
              (Design) I need to go for prototype drawings based on the requirements and check with
              that colleague for functionality and style.
            </li>
            <li>
              (Development) Utilizing the expertise I have, I choose the appropriate way to code the
              functionality for implementation. After self-testing for accuracy, deployed the
              program to the test environment and notified the test engineers to validate the
              developed functionality.
            </li>
            <li>
              (Testing) Analyze and deal with the problems identified. Once all issues have been
              addressed, the program will be deployed to the production environment and made
              available to business colleagues to use and receive feedback.
            </li>
          </ol>
        </p>
        <p>
          My professional skills include Front-end development (React + Typescript), Back-end
          development (Kratos + Golang), Bash, Python, SQL. my English level is up to CET6.
        </p>
        <p>
          I did my undergraduate study at Beijing Institute of Technology (Zhuhai) and postgraduate
          study at Shanghai Maritime University under the supervision of Prof.{' '}
          <a
            href="https://cie.shmtu.edu.cn/2020/1214/c6356a49390/page.htm"
            target="_blank"
            rel="noopener noreferrer"
          >
            Han Dezhi (韩德志)
          </a>
          . During my graduate studies, I was awarded the National Scholarship for Master&apos;s
          Students (Top 1%).
        </p>
        <p>
          If you are interested in the code implementation of the site, welcome to star and fork my
          open-sourced repository{' '}
          <a href="https://github.com/duganlx/kiGo" target="_blank" rel="noopener noreferrer">
            kiGo
          </a>
          .
        </p>
      </div>
      <div className="item">
        <div className="title">📇 Blogs</div>
        <ul>
          {catalog.map((item) => (
            <li key={item.id}>
              <a href={`${pageBlogsurl}?blogId=${item.id}`}>{item.title}</a>
              .&nbsp;
              {item.updateTime}.&nbsp;
              {item.tags.map((tag) => (
                <>
                  <span
                    key={tag}
                    style={{
                      // display: 'inline-block',
                      backgroundColor: '#fff7e6',
                      color: '#d46b08',
                      border: '1px solid #ffd591',
                      borderRadius: '4px',
                      padding: '0 4px',
                      // fontSize: '12px',
                      // lineHeight: '1',
                    }}
                  >
                    {tag}
                  </span>
                  &nbsp;
                </>
              ))}
            </li>
          ))}
          <li>
            <a href={`${pageBlogsurl}`}>...(more)</a>
          </li>
        </ul>
      </div>
      <div className="item">
        <div className="title">🎯 Projects</div>
        <ul>
          <li>
            kiGo. A website developed using the ant design pro template, which is the source code
            for the site you are looking at now.&nbsp;
            <a href="https://github.com/duganlx/kiGo" target="_blank" rel="noopener noreferrer">
              repository
            </a>
          </li>
          <li>
            xubuntu-docker. This is a visual ubuntu development environment used to create and
            initialize in Docker.&nbsp;
            <a
              href="https://github.com/duganlx/xubuntu-docker"
              target="_blank"
              rel="noopener noreferrer"
            >
              repository
            </a>
          </li>
        </ul>
      </div>
      <div className="item">
        <div className="title">👔 Experiences</div>
        <ul>
          <li>
            2023.06 - now.&nbsp;
            <a href="http://www.jhlfund.com/about" target="_blank" rel="noopener noreferrer">
              Evoluation Asset Management,Ltd
            </a>
            . Full-Stack Developer.
          </li>
        </ul>
      </div>
      <div className="item">
        <div className="title">💻 Internships</div>
        <ul>
          <li>
            2022.08 - 2023.04.&nbsp;
            <a href="http://www.jhlfund.com/about" target="_blank" rel="noopener noreferrer">
              Evoluation Asset Management,Ltd
            </a>
            . Full-Stack Developer Intern.
          </li>
          <li>
            2022.04 - 2022.07.&nbsp;
            <a href="http://datauseful.com/AboutUs-2/" target="_blank" rel="noopener noreferrer">
              Shanghai Yousifu Information Technology Co.,Ltd
            </a>
            . Go Developer Intern.
          </li>
          <li>
            2021.03 - 2021.07.&nbsp;
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
        <div className="title">📖 Educations</div>
        <ul>
          <li>
            2021.09 - 2023.06. Master. Shanghai Maritime University. Shanghai. Software Engineering.
            GPA: 87/100. Rank: 29/181.
          </li>
          <li>
            2017.09 - 2021.06. Bachelor. Beijing Institute Of Technology (Zhuhai). Zhuhai. Computer
            Science and Technology. GPA: 91/100. Rank: 1/147.
          </li>
          <li>2014.09 - 2017.06. Shenzhen Nanshan Foreign Language School. Shenzhen.</li>
        </ul>
      </div>
      <div className="item">
        <div className="title">🏆 Honors and Awards</div>
        <ul>
          <li>
            2023. Honorary Title for Outstanding Graduates of Shanghai Ordinary Higher Education
            Institutions in 2023.
          </li>
          <li>
            2022. Received the National Scholarship for Master&apos;s Degree at Shanghai Maritime
            University.
          </li>
          <li>
            2022. Published a paper in the EURASIP Journal on Wireless Communications and Networking
            titled &apos;
            <a
              href="https://jwcn-eurasipjournals.springeropen.com/articles/10.1186/s13638-022-02180-w"
              target="_blank"
              rel="noopener noreferrer"
            >
              Network Abnormal Traffic Detection Method Based on Fusion of Chord Similarity and
              Multiple Loss Encoder
            </a>
            &apos;.
          </li>
          <li>
            2021. Second Prize in the 18th China Graduate Mathematical Modeling Competition
            &quot;Huawei Cup&quot;.
          </li>
          <li>
            2021. Honorary Title for Outstanding Graduates of Beijing Institute of
            Technology(Zhuhai) in 2021.
          </li>
          <li>
            2021-2023. Served as the Propaganda Committee Member of the Party Branch of the CPC for
            2021 professional master student of Shanghai Maritime University.
          </li>
          <li>
            2017-2021. Received seven scholarships from Beijing University of Technology(Zhuhai)
            including three special scholarships(Top 1%), three first-class scholarships(Top 5%),
            and one second-class scholarship(Top 10%).
          </li>
          <li>
            2017-2020. Received the honorary title of &quot;Outstanding Student&quot; from Beijing
            University of Technology(Zhuhai) for three consecutive years.
          </li>
          <li>
            2020. Second Prize of the 12th National College Student Mathematics Competition
            (Guangdong Provincial Competition).
          </li>
          <li>
            2019. Second Prize in the Campus Selection Competition of the 9th ACM/ICPC Program
            Design Competion of Beijing Institute of Technology, Zhuhai.
          </li>
          <li>
            2019. Participated in the research and development of the school level college student
            innovation and entrepreneurship training project &quot;Online Practice System Based on
            WeChat Mini Programs&quot;. The project was successfully completed, obtaining two
            computer software copyright registration certificates and publishing a paper in the
            journal &quot; Computer Knowledge and Technology&quot;.
          </li>
          <li>
            2018. Participated in the research and development of the provincial college student
            innovation and entrepreneurship training project &quot;Smart Campus Face Recognition
            System&quot;。 The project was successfully completed, obtaining a software copyright
            registration certificate and publishing a paper in the journal &quot;Modern
            Computer&quot;.
          </li>
          <li>
            2017-2021. Served as the life committe member of Class 2 in Computer Science and
            Technology.
          </li>
          <li>
            2017. Third Prize of the 7th C Language Programming Challenge Cup at Beijing University
            of Technology, Zhuhai.
          </li>
        </ul>
      </div>
      {/* <div className="item">
        <div className="title">📇Labels</div>
        <div className="label-showcase">
          <Labelshow />
        </div>
      </div> */}
    </div>
  );
};

export default Contentview;
