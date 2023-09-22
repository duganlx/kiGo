import { useEmotionCss } from '@ant-design/use-emotion-css';
import { DatePicker, Input, Select } from 'antd';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { useEffect, useState } from 'react';

dayjs.extend(isBetween);
const { RangePicker } = DatePicker;

function generateDateRangeDisableFn(begin: dayjs.Dayjs | null, end: dayjs.Dayjs | null) {
  if (begin === null || end === null) {
    return () => true;
  }

  return (date: dayjs.Dayjs) => {
    return !date.isBetween(begin, end, 'day', '[]');
  };
}

interface SearchViewProps {
  oldestDate: dayjs.Dayjs;
  latestDate: dayjs.Dayjs;

  selectOpts: any[];

  notifyFilterCondition: (fc: any) => void;
}

const SearchView: React.FC<SearchViewProps> = (props) => {
  const { oldestDate, latestDate, selectOpts, notifyFilterCondition } = props;

  const [keyword, setKeyword] = useState<string>('');
  const [selectedtag, setSelectedtag] = useState<string[]>([]);
  const [begin, setBegin] = useState<dayjs.Dayjs | null>(oldestDate);
  const [end, setEnd] = useState<dayjs.Dayjs | null>(latestDate);

  const className = useEmotionCss(() => {
    return {
      border: '2px dashed #ffccc7',
      borderRadius: '5px',
      padding: '5px 3px 2px 3px',
      position: 'relative',
      display: 'flex',
      height: '95px',
      flexDirection: 'column',
      justifyContent: 'space-between',

      '.title': {
        position: 'absolute',
        top: '-13px',
        left: '10px',
        backgroundColor: 'white',
        zIndex: 10,
        fontSize: '16px',
        fontWeight: 'bold',
        // margin: '0 3px',
      },

      '.finput': {
        // width: '100%',
      },
      '.fselect': {
        width: '100%',

        '.ant-select-selector': {
          height: '26px',
        },
        '.ant-select-selection-item': {
          height: '18px',
        },
      },
      '.frangepicker': {
        width: '100%',
      },
    };
  });

  useEffect(() => {
    notifyFilterCondition({ keyword, selectedtag, begin, end });
  }, [keyword, selectedtag, begin, end]);

  return (
    <div className={className}>
      <div className="title">Search</div>
      <Input
        className="finput"
        placeholder="关键字过滤"
        size="small"
        value={keyword}
        onChange={(v: any) => {
          setKeyword(v.target.value);
        }}
      />
      <Select
        mode="multiple"
        className="fselect"
        options={selectOpts}
        placeholder="标签过滤"
        allowClear
        size="small"
        value={selectedtag}
        onChange={(value: string[]) => {
          setSelectedtag(value);
        }}
      />
      <RangePicker
        className="frangepicker"
        size="small"
        value={[begin, end]}
        allowClear={false}
        onChange={(value: any) => {
          const [tmpBegin, tmpEnd] = value as [dayjs.Dayjs, dayjs.Dayjs];

          setBegin(tmpBegin);
          setEnd(tmpEnd);
        }}
        disabledDate={generateDateRangeDisableFn(oldestDate, latestDate)}
      />
    </div>
  );
};

export default SearchView;
