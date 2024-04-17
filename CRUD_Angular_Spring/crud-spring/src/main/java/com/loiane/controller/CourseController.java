package com.loiane.controller;

import com.loiane.model.Course;
import com.loiane.repository.CourseRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
@AllArgsConstructor
public class CourseController {

    private CourseRepository courseRepository;

    @GetMapping
    public List<Course> list(){
        return courseRepository.findAll();
    }

    /*
    @PostMapping
    //@ResponseStatus(code = HttpStatus.CREATED)
    public ResponseEntity<Course> create(@RequestBody Course course){
    //System.out.println(course.getName());
    //return courseRepository.save(course);
    //    return ResponseEntity.status(HttpStatus.CREATED)
    //            .body(courseRepository.save(course));
    }
    */

    @GetMapping("/{id}")
    public ResponseEntity<Course> findById(@PathVariable Long id){
        return courseRepository.findById(id)
                .map(record -> ResponseEntity.ok().body(record))
                .orElse(ResponseEntity.notFound().build());
        }
    @PostMapping
    //@ResponseStatus(code = HttpStatus.CREATED)
    public Course create(@RequestBody Course course){
        return courseRepository.save(course);
        //return ResponseEntity.status(HttpStatus.CREATED)
        //        .body(courseRepository.save(course));
    }


}
