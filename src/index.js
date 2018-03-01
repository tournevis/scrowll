/*

Forked From https://github.com/GoogleChrome/sample-media-pwa/blob/master/src/client/scripts/helpers/lazy-load-images.js

*/

'use strict'

export default class {
  constructor (className, params, id) {
        this.id = id ? id : 'scrowll-' + this.getRandomInt(0, 100)
        this.className = className
        this.once = params.once
        this.config = {
          ...params,
          rootMargin: '00px',
          threshold: 0.1
        };
  }
  getRandomInt (min, max) {
    return  min + Math.floor(Math.random() * (max - min + 1))
  }
  init () {
    this.els = document.querySelectorAll(`.${this.className}`)
    this.stylesheetInit()
    for (var i = 0; i < this.els.length; i++) {
      this.els[i].classList.add('scrowll-hidden')
    }
    if (!('IntersectionObserver' in window)) {
      this.scrollManager()
      window.onscroll = (ev) => {
        this.scrollManager(ev)
      }
    } else {
      this.intersectionManager()
    }
  }
  stylesheetInit () {
    this.stylesheet = document.createElement('style')
    this.stylesheet.innerHTML = " .scrowll-hidden {opacity: 0; transform: translate(0px, 50px); transition: all .3s;} " + ".scrowll-reveal {opacity: 1; transform: translate(0px, 0px);}"
    document.body.appendChild(this.stylesheet)
  }

  scrollManager (ev) {
    for (var i = 0; i < this.els.length; i++) {
      var bottom_of_object = this.els[i].getBoundingClientRect().y + this.els[i].getBoundingClientRect().height + 60
      var bottom_of_window = window.scrollY + window.innerHeight / 2
      if( bottom_of_window > bottom_of_object ){
        this.els[i].classList.add('scrowll-reveal')
      } else {
        this.els[i].classList.remove('scrowll-reveal')
      }
    }
  }
  intersectionManager () {
    this.observer = new IntersectionObserver(this.onIntersection.bind(this), this.config);
    this.els.forEach(el => {
      this.observer.observe(el)
    })
  }

  onIntersection (entries) {
    let that = this
    entries.forEach(entry => {
      if (entry.intersectionRatio > 0.1) {
        entry.target.classList.add('scrowll-reveal')
        that.once && that.observer.unobserve(entry.target)
      } else {
        entry.target.classList.remove('scrowll-reveal')
      }
    })
  }
}
