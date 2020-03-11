/**
 * Copyright (C) 2015 Orion Health (Orchestral Development Ltd)
 * <p>
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * <p>
 * http://www.apache.org/licenses/LICENSE-2.0
 * <p>
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package xbdd.webapp;

import org.glassfish.jersey.internal.inject.AbstractBinder;
import org.glassfish.jersey.media.multipart.MultiPartFeature;
import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.server.ServerProperties;
import org.glassfish.jersey.server.TracingConfig;
import xbdd.webapp.factory.MongoDBAccessor;
import xbdd.webapp.factory.ServletContextMongoClientFactory;

import javax.inject.Singleton;
import javax.ws.rs.ApplicationPath;

@ApplicationPath("rest")
public class XbddApplication extends ResourceConfig {

	public XbddApplication() {
		packages(getClass().getPackage().getName());

		// MVC feature

		register(MultiPartFeature.class);

		// Logging.
		// register(LoggingFilter.class);

		property(ServerProperties.TRACING, TracingConfig.ON_DEMAND.name());

		register(new AbstractBinder() {
			@Override
			protected void configure() {
				bindFactory(ServletContextMongoClientFactory.class).to(MongoDBAccessor.class).in(Singleton.class);
			}
		});
	}
}
