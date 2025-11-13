import './App.css'
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "./state/store.ts";
import {updateConstants, updateFunctions, updatePredicates} from "./state/slices/languageSlice.ts"
import {transSequenceAdded, transSequenceRemoved, formulaAdded, formulaRemoved, formulaModified,
        selectTransSequences, selectTransformations, selectFormulaByID} from "./state/slices/mainTaskSlice.ts";

function FormulaBox({ TransId, id, canRemove }: { TransId: number; id: number, canRemove: boolean }) {
    const formula = useSelector((state: RootState)  => selectFormulaByID(state, id));
    const dispatch = useDispatch();
    console.log("drawing line", id, "in", TransId);

    return (
        <div className="line-box">
            <p>henlo :3 {id}</p>
            <div className="row">
                {formula.prevFormula !== null && <span>    &lt;==&gt;    </span>}
                <input type="text" value={formula.formula}
                       onChange={(e) => dispatch(formulaModified({id: id, formula: e.target.value, operation: formula.operation}))} />
                <button onClick={() => dispatch(formulaAdded({transformation: TransId, prevFormula:id}))}>+ line</button>
                <button disabled={!canRemove} onClick={() => dispatch(formulaRemoved({transformation: TransId, id:id}))}>- line</button>
                <select value={formula.operation} onChange={(e) => dispatch(formulaModified({id: id, formula:formula.formula, operation: e.target.value}))}>
                    <option value="">---</option>
                    <option value="OP 1">OP 1</option>
                    <option value="OP 2">OP 2</option>
                    <option value="OP 3">OP 3</option>
                </select>
                <span>you selected {formula.operation}</span>
            </div>
        </div>
    )
}

function TransformationsBox({ id }: { id: number }) {
    const formulas = useSelector((state: RootState)  => selectTransformations(state, id));
    const dispatch = useDispatch();
    console.log("drawing Box", id)


    return (
        <div className="small-box">
            <h1> i am a small box {id}</h1>
            {formulas.map((formula) => <FormulaBox key={formula} TransId={id} id={formula} canRemove={formulas.length > 1} />)}
            <button className="btn" onClick={() => dispatch(transSequenceAdded(id))}>Add Equivalent Change</button>
            <button className="rmv" onClick={() => dispatch(transSequenceRemoved(id))}>Remove Equivalent Change</button>
        </div>
    )
}

function MainTaskBox() {
    const tasks: number[] = useSelector(selectTransSequences);

    return (
        <div className="body">
            <h2>hehe</h2>
            {tasks.map((task) => <TransformationsBox key={task} id={task} />)}
        </div>
    )
}

function LangBox() {
    const consts: string = useSelector((state: RootState) => state.language.constants);
    const preds: string = useSelector((state: RootState) => state.language.predicates);
    const funcs: string = useSelector((state: RootState) => state.language.functions);

    const dispatch = useDispatch();

    return (
        <>
            <div className="language">
                <h3>Language ℒ</h3>
                <div className="row">
                    <div className="form-group">
                        <div className="preprend">
                            <div className="input-group-text">𝓒<sub>𝓛</sub> = {"{"}</div>
                        </div>
                        <input type="text"
                               id="input-constants"
                               value={consts}
                               onChange={e => dispatch(updateConstants(e.target.value))}></input>
                        <div className="append">
                            <div className="input-group-text">{"}"}</div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="form-group">
                        <div className="preprend">
                            <div className="input-group-text">𝓟<sub>𝓛</sub> = {"{"}</div>
                        </div>
                        <input type="text"
                               id="input-predicates"
                               value={preds}
                               onChange={e => dispatch(updatePredicates(e.target.value))}></input>
                        <div className="append">
                            <div className="input-group-text">{"}"}</div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="form-group">
                        <div className="preprend">
                            <div className="input-group-text">𝓕<sub>𝓛</sub> = {"{"}</div>
                        </div>
                        <input type="text"
                               id="input-functions"
                               value={funcs}
                               onChange={e => dispatch(updateFunctions(e.target.value))}></input>
                        <div className="append">
                            <div className="input-group-text">{"}"}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default  function App() {
    //const [language, setLanguage] = useState(["", "", ""]);

    /*function changeLanguage(text, index) {
        let newLanguage = [...language];
        newLanguage[index] = text;
        setLanguage(newLanguage);
    }*/

    return (
        <div className="app">
            <LangBox />
            <MainTaskBox />
        </div>
    )
}