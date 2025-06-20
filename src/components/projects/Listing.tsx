import { type FC } from "react";

import { MdAdd } from "react-icons/md";

import type { Project } from "../../types/project";
import Button from "../shared/Button";
interface ProjectListingProps {
  projects: Project[];
  fileteredProjects: Project[];
  onSelectProject: (projectId: string) => void;
  onClickCreateProject: () => void;
}

const ProjectListing: FC<ProjectListingProps> = ({
  projects,
  fileteredProjects,
  onSelectProject,
  onClickCreateProject,
}) => {
  return (
    <div className="w-full">
      {!projects?.length ? (
        <div className="w-full flex flex-col items-center justify-center py-20">
          <div className="max-w-md text-center">
            <div className="bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 rounded-full w-32 h-32 flex items-center justify-center mx-auto mb-8 shadow-2xl">
              <MdAdd className="w-16 h-16 text-blue-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to start something amazing?
            </h3>
            <p className="text-gray-600 mb-10 text-lg leading-relaxed">
              Create your first project and start turning your ideas into
              reality
            </p>
            <Button>Create Your First Project</Button>
          </div>
        </div>
      ) : (
        <>
          {!fileteredProjects?.length && (
            <div className="w-full flex flex-col items-center justify-center py-20">
              <div className="max-w-md text-center">
                <div className="bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 rounded-full w-32 h-32 flex items-center justify-center mx-auto mb-8 shadow-2xl">
                  <MdAdd className="w-16 h-16 text-blue-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  No projects found
                </h3>
                <p className="text-gray-600 mb-10 text-lg leading-relaxed">
                  Try adjusting your search or filter criteria to find what
                  you're looking for
                </p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProjectListing;
