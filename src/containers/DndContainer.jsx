import React from 'react';
import { DndProvider } from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import PlanEdit from '../pages/mypage/PlanEdit';

const DndContainer = ({setUserId,planData,removePlanPlace}) => {
    return (
        <div>
            <DndProvider backend={HTML5Backend}>
                <PlanEdit setUserId={setUserId} planData={planData} removePlanPlace={removePlanPlace}/>
            </DndProvider>
        </div>
    );
};

export default DndContainer;