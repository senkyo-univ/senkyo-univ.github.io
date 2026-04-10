import { publicCourses } from '../data/publicCourses';
import type { CourseListItem, CourseRecord, CourseSearchFields } from '../types/course';
import { matchesPartial } from './text';

export function toPublicCourseListItem(course: CourseRecord): CourseListItem {
  return {
    route: `/syllabus/course/${course.id}`,
    code: course.code,
    title: course.title,
    instructor: course.instructor,
    faculty: course.faculty,
    schedule: course.schedule,
    credits: course.credits,
  };
}

export function filterPublicCourses(filters: CourseSearchFields): CourseRecord[] {
  return publicCourses.filter((course) => {
    return (
      matchesPartial(course.code, filters.courseCode) &&
      matchesPartial(course.title, filters.title) &&
      matchesPartial(course.instructor, filters.instructor) &&
      matchesPartial(course.summary, filters.description) &&
      matchesPartial(course.requirements, filters.requirements)
    );
  });
}

export function getPublicCourseById(id: string): CourseRecord | undefined {
  return publicCourses.find((course) => course.id === id);
}

