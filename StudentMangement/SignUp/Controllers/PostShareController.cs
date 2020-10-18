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
    public class PostShareController : ApiController
    {
        private SMSDBEntities2 db = new SMSDBEntities2();

        // GET: api/PostShare
        public IQueryable<PostShare> GetPostShares()
        {
            return db.PostShares;
        }

        // GET: api/PostShare/5
        [ResponseType(typeof(PostShare))]
        public IHttpActionResult GetPostShare(int id)
        {
            PostShare postShare = db.PostShares.Find(id);
            if (postShare == null)
            {
                return NotFound();
            }

            return Ok(postShare);
        }

        // PUT: api/PostShare/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutPostShare(int id, PostShare postShare)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != postShare.id)
            {
                return BadRequest();
            }

            db.Entry(postShare).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PostShareExists(id))
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

        // POST: api/PostShare
        [ResponseType(typeof(PostShare))]
        public IHttpActionResult PostPostShare(PostShare postShare)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.PostShares.Add(postShare);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = postShare.id }, postShare);
        }

        // DELETE: api/PostShare/5
        [ResponseType(typeof(PostShare))]
        public IHttpActionResult DeletePostShare(int id)
        {
            PostShare postShare = db.PostShares.Find(id);
            if (postShare == null)
            {
                return NotFound();
            }

            db.PostShares.Remove(postShare);
            db.SaveChanges();

            return Ok(postShare);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PostShareExists(int id)
        {
            return db.PostShares.Count(e => e.id == id) > 0;
        }
    }
}