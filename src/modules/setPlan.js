const SET_PLAN ='setPlan/SET_PLAN';
const REMOVE_PLACE='setPlan/REMOVE_PLACE';

export const setPlanData=(input)=>({type:SET_PLAN,input});
export const removePlanPlace=(id)=>({type:REMOVE_PLACE,id});

const initialState={
    planData:{
        loginSuccess:Boolean,
        userId:String,
        start_date:Date,
        end_date:Date,
        total_days:Number,
        plan_id:String,
        title:String,
        liked:Number,
        isPublic:Boolean,
        places:[
            {
                id: String,
                place_name: String,
                x: String,
                y: String,
                checked:Boolean,
                day:Number
            },
        ]
    }
}

function setPlan(state=initialState,action){
    switch(action.type){
        case SET_PLAN:
            return {...state,
                planData:state.planData=action.input
            }
        case REMOVE_PLACE:
            return{...state,
                planData:{...state.planData,
                    places:state.planData.places.filter(place=>place.id !== action.id)
                }
            };
        default : return state;
    }
}

export default setPlan;