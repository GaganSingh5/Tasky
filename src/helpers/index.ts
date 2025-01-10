import { collatedTasks } from '../constants';

interface Project {
  name: string;
  projectId: string;
  userId: string
}

export const getTitle = (projects: Project[], projectId: string): Project | undefined =>
  projects.find(project => project.projectId === projectId);

interface CollatedProject {
  key: string;
}

export const getCollatedTitle = (projects: CollatedProject[], key: string): CollatedProject | undefined =>
  projects.find(project => project.key === key);

interface SelectedProject {
  key: string;
}

interface CollatedTask {
  key: string;
}

export const collatedTasksExist = (selectedProject: SelectedProject): boolean =>
  collatedTasks.some((task: CollatedTask) => task.key === selectedProject.key);

export const generatePushId = (() => {
  const PUSH_CHARS =
    '-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz';

  const lastRandChars = [];

  return function() {
    let now = new Date().getTime();

    const timeStampChars = new Array(8);
    for (var i = 7; i >= 0; i--) {
      timeStampChars[i] = PUSH_CHARS.charAt(now % 64);
      now = Math.floor(now / 64);
    }

    let id = timeStampChars.join('');

    for (i = 0; i < 12; i++) {
      id += PUSH_CHARS.charAt(lastRandChars[i]);
    }

    return id;
  };
})();
