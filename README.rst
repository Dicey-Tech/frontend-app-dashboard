|Build Status| |Codecov| |license|

Dicey-Tech Frontend App Teacher Dashboard
=================================


Introduction
------------

This repository is the prototype teacher dashboard for the Dicey Tech classroom system

Installation
------------

We use Tutor for Edx please follow the instructions for installation and addition of this MFE as a plugin part of the MFE plugin.


Default port is 1999.

Start the dev server:

  ``npm start``

The dev server is running at `http://app.local.overhang.io:1999.

Project Structure
-----------------

The source for this project is organized into nested submodules according to the ADR `Feature-based Application Organization <https://github.com/edx/frontend-template-application/blob/master/docs/decisions/0002-feature-based-application-organization.rst>`_.

Build Process Notes
-------------------

**Production Build**

The production build is created with ``npm run build``.

Internationalization
--------------------

Please see `edx/frontend-platform's i18n module <https://edx.github.io/frontend-platform/module-Internationalization.html>`_ for documentation on internationalization.  The documentation explains how to use it, and the `How To <https://github.com/edx/frontend-i18n/blob/master/docs/how_tos/i18n.rst>`_ has more detail.

.. |Build Status| image:: https://api.travis-ci.com/edx/frontend-template-application.svg?branch=master
   :target: https://travis-ci.com/edx/frontend-template-application
.. |Codecov| image:: https://codecov.io/gh/edx/frontend-template-application/branch/master/graph/badge.svg
   :target: https://codecov.io/gh/edx/frontend-template-application
.. |license| image:: https://img.shields.io/npm/l/@edx/frontend-template-application.svg
   :target: @edx/frontend-template-application
