import { mapProjectFromApiToVm } from './project.mapper';
import * as apiModel from './api/project.api-model';
import * as viewModel from './project.vm';

describe('Project Mapper Tests', () => {
  it.each<{ project: apiModel.Project }>([
    { project: undefined },
    { project: null },
  ])(
    'should return an empty project when project is $project',
    ({ project }) => {
      // Arrange
      vi.spyOn(viewModel, 'createEmptyProject').mockReturnValue({
        id: '',
        name: '',
        externalId: '',
        comments: '',
        isActive: false,
        employees: [],
      });
      //Act
      const result = mapProjectFromApiToVm(project);

      // Assert
      expect(viewModel.createEmptyProject).toHaveBeenCalled();
      expect(result).toEqual(viewModel.createEmptyProject());
    }
  );

  it.each<{ employees: apiModel.EmployeeSummary[] }>([
    { employees: undefined },
    { employees: null },
    { employees: [] },
  ])(
    'should return a project without employees when employees are $employees',
    ({ employees }) => {
      // Arrange
      const project: apiModel.Project = {
        id: '1',
        name: 'Test Project',
        employees,
        isActive: true,
      };

      // Act
      const result = mapProjectFromApiToVm(project);

      // Assert
      expect(result).toEqual({
        ...project,
        employees: [],
      });
    }
  );

  it('should map project with employees correctly', () => {
    // Arrange
    const employees: apiModel.EmployeeSummary[] = [
      { id: '1', employeeName: 'John Doe' },
      { id: '2', employeeName: 'Jane Smith' },
    ];
    const project: apiModel.Project = {
      id: '1',
      name: 'Test Project',
      employees,
      isActive: true,
    };

    // Act
    const result = mapProjectFromApiToVm(project);

    // Assert
    const expectedProject: viewModel.Project = {
      id: '1',
      name: 'Test Project',
      isActive: true,
      employees: [
        { id: '1', employeeName: 'John Doe' },
        { id: '2', employeeName: 'Jane Smith' },
      ],
    };
    expect(result).toEqual(expectedProject);
  });
});
