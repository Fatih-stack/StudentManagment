using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using SignUp.Models;

namespace SignUp.Controllers
{
    public class EnrolledCoursController : ApiController
    {
        private SMSDBEntities2 db = new SMSDBEntities2();

        // GET: api/EnrolledCours
        public IQueryable<EnrolledCours> GetEnrolledCourses()
        {
            return db.EnrolledCourses;
        }

        // GET: api/EnrolledCours/5
        [ResponseType(typeof(EnrolledCours))]
        public IHttpActionResult GetEnrolledCours(int id)
        {
            EnrolledCours enrolledCours = db.EnrolledCourses.Find(id);
            if (enrolledCours == null)
            {
                return NotFound();
            }

            return Ok(enrolledCours);
        }

        // PUT: api/EnrolledCours/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutEnrolledCours(int id, EnrolledCours enrolledCours)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != enrolledCours.id)
            {
                return BadRequest();
            }

            db.Entry(enrolledCours).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EnrolledCoursExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/EnrolledCours
        [ResponseType(typeof(EnrolledCours))]
        public IHttpActionResult PostEnrolledCours(EnrolledCours enrolledCours)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.EnrolledCourses.Add(enrolledCours);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = enrolledCours.id }, enrolledCours);
        }

        // DELETE: api/EnrolledCours/5
        [ResponseType(typeof(EnrolledCours))]
        public IHttpActionResult DeleteEnrolledCours(int id)
        {
            EnrolledCours enrolledCours = db.EnrolledCourses.Find(id);
            if (enrolledCours == null)
            {
                return NotFound();
            }

            db.EnrolledCourses.Remove(enrolledCours);
            db.SaveChanges();

            return Ok(enrolledCours);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool EnrolledCoursExists(int id)
        {
            return db.EnrolledCourses.Count(e => e.id == id) > 0;
        }
    }
}