import styles from "./dashboard.module.css"
import FomrFields from '../widgets/FormFields/FormFileds';
import React, { useState , useReducer, useEffect} from 'react';
import { firebaseTeams } from "../../firebase";
import { Editor } from 'react-draft-wysiwyg';
import {EditorState , convertFormRaw, convertToRaw } from 'draft-js';
import { stateToHTML } from "draft-js-export-html";

const Author={
    element: 'input',
    value:'',
    config:{
        name:"author_input",
        type:"text",
        placeholder:"Enter your name"
    },
    validation:{
        required:true
    },
    valid:false,
    touched:false,
    validationMessage: ""
}

const Title={
    element: 'input',
    value:'',
    config:{
        name:"title_input",
        type:"text",
        placeholder:"Enter article title"
    },
    validation:{
        required:true
    },
    valid:false,
    touched:false,
    validationMessage: ""
}
const Team ={
    element: 'select',
    value:'',
    config:{
        name:"tema_input",
        options:[]
    },
    validation:{
        required:true
    },
    valid:false,
    touched:false,
    validationMessage: ""
}
const reducer = (state, action) => {
    if(action.blur){
        let validData = validate(state)
        return {...state, valid:validData[0] ,
             validationMessage:validData[1], 
            touched:action.blur}
    }
    
     return {...state ,  value: action.e.target.value }
}

const reducerTeam = (state, action) => {
    if(action.blur){
        let validData = validate(state)
        return {...state, valid:validData[0] ,
             validationMessage:validData[1], 
            touched:action.blur}
    }
    console.log(action)
     return {...state , config:{options:[...action]}  }
}


const validate = (element) => {
    let error = [true, '']

    if (element.validation.email) {
        const valid = /\S+@\S+\.\S+/.test(element.value);
        const message = `${!valid ? "Must be valid email " : ''}`;
        error = !valid ? [valid, message] :error
    }

    if (element.validation.password) {
        const valid = element.value.length >= 5;
        const message = `${!valid ? "Must be greater than 5 " : ''}`;
        error = !valid ? [valid, message] :error
    }

    if (element.validation.required) {
        const valid = element.value.trim() !== '';
        const message = `${!valid ? "This field is required" : ''}`;
        error = !valid ? [valid, message] :error
    }

    return error
}


const Dashboard = () => {

    const [postError, setPostError] = useState('');
    const [loading, setLoading] = useState(false);
    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    const [body, setBody] = useState({
                                    element:"texteditor",
                                    value:'',
                                    valid:true
                                })

    const [author, dispatch] = useReducer(reducer, Author) ;
    const [title, dispatchTitle] = useReducer(reducer, Title) ; 
    const [team, dispatchTeam] = useReducer(reducerTeam, Team)

    useEffect(() => {
       loadTeams()
    }, [])

    const loadTeams = () => {
        firebaseTeams.once("value")
        .then((snapshot) => {
            let teams = []

            snapshot.forEach((childsnapshot) => {
                teams.push({
                    id:childsnapshot.val().id,
                    name:childsnapshot.val().city
                })
                dispatchTeam(teams)
            }) 
        })
        
    }

    const submitForm = (e) => {
        e.preventDefault()

        let DataTOSubmit = {};
        let FormIsValid = true;

        DataTOSubmit={author:author.value , title:title.value , body: body.html}

        FormIsValid = author.valid && FormIsValid;
        FormIsValid =title.valid && FormIsValid;

        console.log(DataTOSubmit)

        if (FormIsValid) {
            console.log("Submit")
        }else {
            setLoading(false)
            setPostError('Something went wrong')
        }
    }

    const submitButton = ( ) => (
        loading ? 'loading...' : 
        <div>
            <button  type="submit" onClick={(e) => submitForm(e, true)}>Add Post</button>
        </div>
    )

    const showError = () => (
        postError !== '' ? 
        <div className={styles.error}>{postError}</div> : ''
    )

    const onEditorStateChange = (editorState) => {

        let contentState = editorState.getCurrentContent();
        let rawState = convertToRaw(contentState)

        let html = stateToHTML(contentState)
        setBody({...body , id:'body',html})
        setEditorState(editorState)
    }
    console.log(team.config.options)
    return ( 
        <div className={styles.postContainer}>
            <form onSubmit={() => submitForm()}>
                <h2>Add Post</h2>

                <FomrFields id={"author"} 
                            formData={author}
                           change={(element) => dispatch(element)}/>


                <FomrFields id={"author"} 
                            formData={title}
                           change={(element) => dispatchTitle(element)}/>


                <br/>
                <Editor 
                editorState={editorState}
                wrapperClassName="myEditor-wrpper"
                editorClassName="myEditor-editor"
                onEditorStateChange={onEditorStateChange}
                />

                <FomrFields id={"teams"} 
                            formData={team}
                           change={(element) => dispatchTeam(element, "select")}
                           />

                {submitButton()}
                {showError()}
            </form>
        </div>
     );
}
 
export default Dashboard;