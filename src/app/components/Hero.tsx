"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { personalInfo, socialLinks, statistics, currentStatus } from '../data/index';

const HeroNew = () => {
  return (
    <section className="min-h-screen py-20 px-4 md:px-8 lg:px-16 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-12 gap-4 md:gap-6 auto-rows-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="col-span-12 md:col-span-4 row-span-2 bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-xl"
          >
            <div className="flex items-start gap-3 mb-4">
              <div className="w-12 h-12 bg-orange-500/20 rounded-2xl flex items-center justify-center">
                <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <div>
                <h3 className="text-white/80 text-sm font-medium">About User</h3>
              </div>
            </div>
            
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              {personalInfo.bio}
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-white/50">Age:</span>
                <span className="text-white/90">{personalInfo.yearsExperience} years old</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-white/50">Experience:</span>
                <span className="text-white/90">{personalInfo.yearsExperience}+ years</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-white/50">Location:</span>
                <span className="text-white/90">{personalInfo.location}</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="col-span-12 md:col-span-4 row-span-3 bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-lg rounded-3xl overflow-hidden border border-white/20 shadow-xl relative"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
            
            <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center relative">
              <div className="w-48 h-48 rounded-full bg-white/10 backdrop-blur-sm border-4 border-white/20" />
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-white/60 text-xs">{currentStatus.availableForWork}</span>
              </div>
              <h1 className="text-4xl font-bold text-white mb-1">
                {personalInfo.name}
              </h1>
              <p className="text-white/70 text-lg">
                {personalInfo.title}
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="col-span-6 md:col-span-2 bg-gradient-to-br from-orange-500/20 to-orange-600/10 backdrop-blur-lg rounded-3xl p-6 border border-orange-500/30 shadow-xl"
          >
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="text-white font-semibold text-sm">Critical</h3>
              <h3 className="text-white font-semibold text-sm">Thinking</h3>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="col-span-6 md:col-span-2 bg-gradient-to-br from-gray-700/30 to-gray-800/20 backdrop-blur-lg rounded-3xl p-6 border border-white/20 shadow-xl"
          >
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="text-3xl mb-3">👁️</div>
              <h3 className="text-white font-semibold text-sm">Visual</h3>
              <h3 className="text-white font-semibold text-sm">Aesthetic</h3>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="col-span-6 md:col-span-2 bg-gradient-to-br from-blue-500/20 to-blue-600/10 backdrop-blur-lg rounded-3xl p-6 border border-blue-500/30 shadow-xl"
          >
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="text-3xl mb-3">📊</div>
              <h3 className="text-white font-semibold text-sm">Attention</h3>
              <h3 className="text-white font-semibold text-sm">to Detail</h3>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="col-span-6 md:col-span-2 bg-gradient-to-br from-purple-500/20 to-purple-600/10 backdrop-blur-lg rounded-3xl p-6 border border-purple-500/30 shadow-xl"
          >
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="text-3xl mb-3">💡</div>
              <h3 className="text-white font-semibold text-sm">Creativity</h3>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="col-span-6 md:col-span-2 bg-gradient-to-br from-gray-600/30 to-gray-700/20 backdrop-blur-lg rounded-3xl p-6 border border-white/20 shadow-xl"
          >
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="text-3xl mb-3">📁</div>
              <h3 className="text-white font-semibold text-sm">Organized</h3>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="col-span-6 md:col-span-2 bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 shadow-xl"
          >
            <div className="flex flex-col items-center justify-center h-full">
              <div className="text-5xl font-bold text-white mb-2">
                {personalInfo.yearsExperience}+
              </div>
              <p className="text-white/60 text-xs text-center">Years of Experience</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="col-span-6 md:col-span-2 bg-gradient-to-br from-blue-600/20 to-blue-500/10 backdrop-blur-lg rounded-3xl p-6 border border-blue-500/30 shadow-xl relative overflow-hidden"
          >
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl" />
            <div className="flex flex-col items-center justify-center h-full relative z-10">
              <div className="text-5xl font-bold text-white mb-2">
                {statistics.totalProjects}
              </div>
              <p className="text-white/60 text-xs text-center">Projects Completed</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65 }}
            className="col-span-12 md:col-span-4 bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 shadow-xl"
          >
            <h3 className="text-white font-semibold mb-4 text-sm">Connect With Me</h3>
            <div className="grid grid-cols-3 gap-3">
              <a 
                href={socialLinks.github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/5 hover:bg-white/10 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 transition-all hover:scale-105 border border-white/10"
              >
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                <span className="text-white text-xs">GitHub</span>
              </a>
              
              <a 
                href={socialLinks.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/5 hover:bg-white/10 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 transition-all hover:scale-105 border border-white/10"
              >
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <span className="text-white text-xs">LinkedIn</span>
              </a>
              
              <a 
                href={socialLinks.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/5 hover:bg-white/10 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 transition-all hover:scale-105 border border-white/10"
              >
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span className="text-white text-xs">Instagram</span>
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="col-span-12 md:col-span-4 bg-gradient-to-br from-green-500/20 to-green-600/10 backdrop-blur-lg rounded-3xl p-6 border border-green-500/30 shadow-xl"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <h3 className="text-white/80 text-sm font-medium">Currently Building</h3>
            </div>
            
            <h4 className="text-white font-semibold text-lg mb-2">
              {currentStatus.currentlyBuilding.project}
            </h4>
            <p className="text-white/60 text-sm mb-4">
              {currentStatus.currentlyBuilding.description}
            </p>
            
            <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${currentStatus.currentlyBuilding.progress}%` }}
                transition={{ duration: 1, delay: 0.8 }}
                className="h-full bg-green-500 rounded-full"
              />
            </div>
            <p className="text-white/50 text-xs mt-2 text-right">
              {currentStatus.currentlyBuilding.progress}% Complete
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.75 }}
            className="col-span-12 md:col-span-4 bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 shadow-xl"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="text-2xl">📚</div>
              <h3 className="text-white/80 text-sm font-medium">Currently Learning</h3>
            </div>
            
            <div className="space-y-2">
              {currentStatus.currentlyLearning.map((item, index) => (
                <div 
                  key={index}
                  className="bg-white/5 rounded-xl p-3 flex items-center gap-3 border border-white/10"
                >
                  <div className="text-xl">{item.icon}</div>
                  <span className="text-white text-sm font-medium">{item.name}</span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeroNew;