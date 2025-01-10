/* eslint-disable no-nested-ternary */
import { useState, useEffect } from 'react';
import moment from 'moment';
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  onSnapshot,
  getFirestore
} from 'firebase/firestore';
import { collatedTasksExist } from '../helpers';
import { firebase } from '../firebase';
const db = getFirestore(firebase);

// ✅ Updated `useTasks` Hook
export const useTasks = (selectedProject) => {
  const [tasks, setTasks] = useState([]);
  const [archivedTasks, setArchivedTasks] = useState([]);

  useEffect(() => {
    let q = query(collection(db, 'tasks'), where('userId', '==', 'jlIFXIwyAL3tzHMtzRbw'));

    q = selectedProject && !collatedTasksExist(selectedProject)
      ? query(q, where('projectId', '==', selectedProject))
      : selectedProject === 'TODAY'
        ? query(q, where('date', '==', moment().format('DD/MM/YYYY')))
        : (selectedProject === 'INBOX' || selectedProject === 0)
          ? query(q, where('date', '==', ''))
          : q;

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newTasks = snapshot.docs.map((task) => ({
        id: task.id,
        ...task.data(),
      }));

      setTasks(
        selectedProject === 'NEXT_7'
          ? newTasks.filter(
            (task) =>
              moment(task.date, 'DD-MM-YYYY').diff(moment(), 'days') <= 7 &&
              task.archived !== true
          )
          : newTasks.filter((task) => task.archived !== true)
      );

      setArchivedTasks(newTasks.filter((task) => task.archived !== false));
    });

    return () => unsubscribe();
  }, [selectedProject]);

  return { tasks, archivedTasks };
};

// ✅ Updated `useProjects` Hook
export const useProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const getProjects = async () => {
      const q = query(
        collection(db, 'projects'),
        where('userId', '==', 'jlIFXIwyAL3tzHMtzRbw'),
        orderBy('projectId')
      );

      const snapshot = await getDocs(q);
      const allProjects = snapshot.docs.map((project) => ({
        ...project.data(),
        docId: project.id,
      }));

      if (JSON.stringify(allProjects) !== JSON.stringify(projects)) {
        setProjects(allProjects);
      }
    };

    getProjects();
  }, [projects]);

  return { projects, setProjects };
};
