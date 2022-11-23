import s from "./main.module.css";
import {Slider} from "@mui/material";
import {CardType, COUNT_DEFAULT_VALUE, sortDirectionType, TYPE_DEFAULT_VALUE, TypeType} from "./main-field";

type CountMarksType = {value: number, label: string}
const countMarks:CountMarksType[] = [
    {value: 2, label: '2'},
    {value: 3, label: '3'},
    {value: 4, label: '4'},
    {value: 5, label: '5'},
];
type TypeMarksType = { value: number, label: string, code: TypeType}
const typeMarks:TypeMarksType[] = [
    {value: 0, label: 'A', code: 0},
    {value: 1, label: '9', code: 9},
    {value: 2, label: '19', code: 19},
    {value: 3, label: '50', code: 50},
    {value: 4, label: '99', code: 99},
    {value: 5, label: '999', code: 999}
];

type SettingsPropsType = {
    totalCount: number,
    setTotalCount: (n: number) => void,

    type: TypeType,
    setType: (v: TypeType) => void,

    sortDirection: sortDirectionType,
    setSortDirection: (s:sortDirectionType) => void

    resultList: CardType[],
    setResultList: (rList: CardType[]) => void

    cardList: CardType[]
}
const Settings = (props: SettingsPropsType) => {

    const onCountChange = (event: Event, value: number | number[], activeThumb: number) => {
        //console.log(value, typeof value)
        if (typeof value === 'number')
            props.setTotalCount(value)
    }
    const onTypeChange = (event: Event, value: number | number[], activeThumb: number) => {
        //console.log(value);
        const t = typeMarks.find(el => el.value === value)
        if (typeof value === 'number' && t)
            //props.setType(value)
            props.setType(t.code);
    }

    const sortingUpClickHandler = () => {
        props.setSortDirection("UP")
        props.setResultList([...props.cardList]
            .sort((a, b) => {
                if ((/^-?\d+$/.test(a.text) && (/^-?\d+$/.test(b.text)))) return Number(a.text) - Number(b.text)
                if (a.text < b.text) return -1
                if (a.text > b.text) return 1
                return 0;
            })
            .map((el) => {
                return {...el, id: el.id + props.totalCount, text: el.text+"-", value: el.text}
            }));
    }
    const sortingDownClickHandler = () => {
        props.setSortDirection("DOWN")
        //console.log(props.sortDirection)
        props.setResultList([...props.cardList]
            .sort((a, b) => {
                if ((/^-?\d+$/.test(a.text) && (/^-?\d+$/.test(b.text)))) return Number(a.text) - Number(b.text)
                if (a.text < b.text) return -1
                if (a.text > b.text) return 1
                return 0;
            })
            .map((el) => {
                return {...el, id: el.id + props.totalCount, text: '', value: el.text}
            }).reverse());
    }

    return <div className={s.settingsDiv}>

        <div className={s.settings_slider}>
            <div>Количество предметов:</div>
            <Slider
                defaultValue={COUNT_DEFAULT_VALUE}
                valueLabelDisplay="auto"
                step={1}
                min={2}
                max={5}
                marks={countMarks}
                onChange={onCountChange}
            />
        </div>

        <div className={s.settings_slider}>
            <div>Значения:</div>
            <Slider
                //aria-label="Temperature"
                //defaultValue={TYPE_DEFAULT_VALUE}
                //valueLabelDisplay="auto"
                step={1}
                min={0}
                max={typeMarks.length-1}
                //scale={calculateValue}
                marks={typeMarks}
                onChange={onTypeChange}
                //getAriaLabel={() => 'rrr'}
                //getAriaValueText={valuetext}
            />
        </div>

        <div className={s.setting_up_or_down}>
            <div
                className={ props.sortDirection === 'UP' ? s.up_or_down_div + " " + s.up_or_down_selected: s.up_or_down_div }
                onClick={sortingUpClickHandler}
            >
                <label>По возрастанию</label>
            </div>
            <div
                className={ props.sortDirection === 'DOWN' ? s.up_or_down_div + " " + s.up_or_down_selected : s.up_or_down_div }
                onClick={sortingDownClickHandler}
            >
                <label>По убыванию</label>
            </div>
        </div>

    </div>
}

export default Settings;