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
        Hello, everyone. My name is Kelly. I am friendly and honest.I am good at English and maths.
        I like surfing the internet,playing computer games, watching TV and traveling. I also like
        playing table tennis and I am good at it ,too. I often play table tennis with my friends on
        weekends. And I want to be a famous table tennis player when I grow up. What I like most is
        to see the seagulls flying freely in the sky so I often go to the sea in summer. My
        favourite colour is white because I think white is symbolize purity.{' '}
      </div>
      <div className="item">
        <div className="title">📇 Blogs</div>
        <ul>
          <li>项目点亮 设计实现. 股票, 技术指标. 2023-10-11</li>
          <li>GPT-4V(ision) System Card 论文研读. AI, 论文. 2023-10-11</li>
          <li>...(more)</li>
        </ul>
      </div>
      <div className="item">
        <div className="title">🎯 Projects</div>
        <ul>
          <li>xx</li>
          <li>xx</li>
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
        <div className="title">📖 Educations</div>
        <ul>
          <li>
            2021.09 - 2023.06. Master. Shanghai Maritime University. Software Engineering. GPA:
            87/100. Rank: 29/181
          </li>
          <li>
            2017.09 - 2021.06. Bachelor. Beijing Institute Of Technology, Zhuhai. Computer Science
            and Technology. GPA: 91/100. Rank: 1/147
          </li>
        </ul>
      </div>
      <div className="item">
        <div className="title">🏆 Honors and Awards</div>
        <ul>
          <li>2023. 上海市优秀毕业生</li>
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
          <li>2021. 优秀毕业生</li>
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
            2017-2020. Received the honorary title of &quot;Excellent Student&quot; from Beijing
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
